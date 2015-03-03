class GisDataController < ApplicationController
    def get
        geojson_text = GisDataHelper.get_data
        render text: geojson_text
    end

    def new
    end

    def upload
    end

    def create
        csv_data = params[:gis_data][:csv]
        if csv_data
            subsidences = GisDataHelper.convert_csv_to_subsidences csv_data
            subsidences.each { |s| s.save }
        else
            subsidence = Subsidence.new(gis_form_data)
            subsidence.save
        end
        redirect_to gis_data_path
    end

    private
    def gis_form_data
        params.require(:gis_data).permit(:latitude, :longitude)
    end
end
