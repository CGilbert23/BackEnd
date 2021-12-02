exports.up = function (knex) {
    return knex.schema.createTable("vehicles", (table) => {
      table.increments("vehicle_id").primary(); // sets vehicle_id as the primary key
      table.string("vehicle_assignment").notNullable();
      table.string("vehicle_stock").notNullable();
      table.integer("vehicle_year").notNullable();
      table.string("vehicle_make").notNullable();
      table.string("vehicle_model").notNullable();
      table.timestamp("date_in").notNullable().defaultTo(knex.fn.now())
      table.timestamp("current_date").notNullable().defaultTo(knex.fn.now())
      table.text("notes");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("vehicles");
  };