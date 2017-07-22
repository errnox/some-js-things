require 'sinatra'
require 'sinatra/asset_pipeline'
require 'haml'


module SuperApp
  class App < Sinatra::Base
    register Sinatra::AssetPipeline

    get '/' do
      @example_text = <<-EXAMPLE
class Weather
  def rain
    puts 'Rain'
  end
  
  def sunshine
    puts 'Sunshine'
  end
  
  def wind
    puts 'Wind'
  end
end

EXAMPLE
      haml :page
    end
    
  end
end
