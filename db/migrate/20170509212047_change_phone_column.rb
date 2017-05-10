class ChangePhoneColumn < ActiveRecord::Migration[5.0]
  def change
    change_column :patients, :phone, :integer, :limit => 8
  end
end
