# coding: utf-8
require 'json'

package = JSON.parse(File.read(File.dirname(__FILE__) + '/package.json'))

Gem::Specification.new do |spec|
  spec.name          = package["name"]
  spec.version       = package["version"]
  spec.authors       = [package["author"]]

  spec.summary       = package["description"]
  spec.description   = package["description"]
  spec.homepage      = package["homepage"]

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.require_paths = ["src"]

  spec.add_development_dependency "bundler", "~> 1.9"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "json"
end
