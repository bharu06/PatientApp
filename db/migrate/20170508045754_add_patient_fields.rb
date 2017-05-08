class AddPatientFields < ActiveRecord::Migration[5.0]
  def change
    change_table :patients do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.date :dob
      t.string :gender
      t.integer :phone
      t.string :extra_info
    end
  end
end
