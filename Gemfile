# NOTE: These are development-only dependencies
source "https://rubygems.org"

gem "bugsnag", "~> 6.22"
gem "listen", "~> 3.7.0"
gem 'jekyll', '~> 4.3.3'
gem 'rake', '~> 13.0.6'
gem 'google-protobuf', '~> 4.26'
gem 'sass-embedded', '~> 1.77.8'
gem 'jekyll-admin', '~> 0.11'
gem 'jekyll-feed', '~> 0.15'
gem 'webrick', '~> 1.7'

# None of these can actually be used in a development copy of dev
# They are all for CI and tests
# `dev` uses no gems
group :development, :test do
  gem "pry-byebug"
  gem "byebug"
  gem "rubocop-shopify", require: false
  gem "rubocop-minitest", require: false
  gem "rubocop-rake", require: false
  gem "iniparse", "~> 1.5"
  gem "colorize", "~> 0.8.1"
  gem "octokit", "~> 4.0"
  gem "bundler", ">= 2.3.11"
  gem "minitest", "~> 5.0"
end

group :test do
  gem "mocha", require: false
  gem "minitest-reporters", require: false
  gem "minitest-fail-fast", require: false
  gem "fakefs", ">= 1.0", require: false
  gem "webmock", require: false
  gem "timecop", require: false
  gem "rack", "~> 2.2", require: false
  gem "cucumber", "~> 7.0", require: false
end
