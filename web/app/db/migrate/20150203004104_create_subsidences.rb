class CreateSubsidences < ActiveRecord::Migration
  def change
    create_table :subsidences do |t|

      t.timestamps null: false
    end
  end
end
