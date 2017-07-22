require 'rack'
require 'rack/static'

require_relative 'app'


use Rack::Static, :urls =>
  [%r{/theme.*}, %r{/mode.*\.js}, %r{/worker.*\.js}, %r{/keybinding.*\.js},
   %r{/ext.*\.js}], :root => 'assets/javascripts/src-min-noconflict'

run SuperApp::App
