require 'csv'

module GisDataHelper
    def self.get_features
        Subsidence.all.map do |s|
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [s.latitude,s.longitude]
                }
            }
        end
    end

    def self.convert_csv_to_subsidences gis_csv_data
        rows = CSV.new(gis_csv_data.read, :headers => true , :header_converters => :symbol ).reject {|r| r.empty?}
        records = rows.to_a.map {|r| r.to_hash}
        self.convert_record_to_subsidence records
    end

    def self.convert_record_to_subsidence gis_records
        gis_records.map do |rec|
            subsidence = Subsidence.new
            subsidence.latitude = rec[:lat]
            subsidence.longitude = rec[:long]
            subsidence
        end
    end

    def self.get_data
        {
            type: "FeatureCollection",
            features: self.get_features
        }.to_json
    end
end
