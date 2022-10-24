const mysql = require('mysql');
const crypto = require('crypto');

function barcodeValue(len) {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex')
}
const barcodegenerated = barcodeValue(8);
console.log('barcode :' + barcodegenerated)



// Create connection
const data = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DATABASE_HOST,
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "ticket_events",
});

// View Tickets
exports.view = (req, res) => {


  // Connect to the database
  data.getConnection((err, connection) => {
    if (err) throw err;
    console.log('MySql connected...' + connection.threadId);

    connection.query('SELECT * FROM tickets', (err, rows) => {


      connection.release();

      if (!err) {
        res.render('home', { rows })
      } else {
        console.error(err)
      }
      console.log('this data from tickets table: \n', rows);
    })



  });
};

exports.form = (req, res) => {
  res.render('add-ticket');
};

// add new ticket
exports.create = (req, res) => {
  const { event_id, event_date, ticket_adult_price, ticket_adult_quantity, ticket_kid_price, ticket_kid_quantity, ticket_reduced_price, ticket_reduced_quantity, ticket_group_price, ticket_group_quantity, barcode, user_id, equal_price, created } = req.body;
  data.getConnection((err, connection) => {
    if (err) throw err;
    console.log('MySql connected...' + connection.threadId)
    connection
      .query('INSERT INTO tickets SET ?',
        {
          event_id: event_id,
          event_date: event_date,
          ticket_adult_price: ticket_adult_price,
          ticket_adult_quantity: ticket_adult_quantity,
          ticket_kid_price: ticket_kid_price,
          ticket_kid_quantity: ticket_kid_quantity,
          ticket_reduced_price: ticket_reduced_price,
          ticket_reduced_quantity: ticket_reduced_quantity,
          ticket_group_price: ticket_group_price,
          ticket_group_quantity: ticket_group_quantity,
          barcode: barcode,
          user_id: user_id,
          equal_price: equal_price,
          created: created,


        },
        (err, rows) => {
          connection.release();
          if (!err) {
            res.render('add-ticket', { alert: 'Билет успешно добавлен!' });
          } else {
            console.error(err);
          };
          console.log('Results: \n', rows)
        });
  });
};

exports.formcol = (req, res) => {
  res.render('add-col');
};

// add new column
exports.createcol = (req, res) => {
  const { new_type_ticket_price, new_type_ticket_quantity } = req.body;
  data.getConnection((err, connection) => {
    if (err) throw err;
    console.log('MySql connected...' + connection.threadId)
    connection
      .query(`ALTER TABLE tickets ADD ${new_type_ticket_price} varchar(35) NOT NULL AFTER ticket_group_quantity, ADD ${new_type_ticket_quantity} varchar(35) NULL AFTER ${new_type_ticket_price};`, (err, rows) => {
        connection.release();
        if (!err) {
          res.render('add-col', { alert: 'столбцы успешно добавлены!' });

        } else {
          console.error(err);
        };
        console.log('Results: \n', rows)
      });
  });
};