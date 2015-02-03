class GisDataController < ApplicationController
    def get
        geojson_text = GisDataHelper.get_data
        render text: geojson_text
    end
end
