# Compass configuration file.

# We also support plugins and frameworks, please read the docs http://docs.mixture.io/preprocessors#compass

project_path = File.expand_path("./",File.dirname(__FILE__))

# Important! change the paths below to match your project setup
css_dir = "dist/css" # update to the path of your css files.
sass_dir = "src/scss" # update to the path of your sass files.
images_dir = "src/img" # update to the path of your image files.
javascripts_dir = "src/js" # update to the path of your script files.

line_comments = false # if debugging (using chrome extension - set this to true)
cache = true
color_output = false # required for Mixture
relative_assets = true # added manually
