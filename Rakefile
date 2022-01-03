# coding: utf-8
require 'open3'
require 'exiftool_vendored'
require 'jekyll'

# Extend string to allow for bold text.
class String
  def bold
    "\033[1m#{self}\033[0m"
  end
end

# Rake Jekyll tasks
task :build do
  puts 'Building site...'.bold
  Jekyll::Commands::Build.process(profile: true)
end

task :clean do
  puts 'Cleaning up _site...'.bold
  Jekyll::Commands::Clean.process({})
end






$IMAGE_PATH = './'

# Return an array of images in $IMAGE_PATH that contain EXIF data
def find_exif_files()
  _, _, status = Open3.capture3("#{Exiftool.command} -r ./ | grep -v 'ExifTool Version Number\\|Exif Byte Order\\|Exif Version' | grep -q '^Exif '")
  puts "status:"
  puts status
  if status != 1
    puts "No EXIF data found"
    return Array.new
  else
    puts "Found EXIF data somewhere..."
  end

  exif_files = Array.new
  # Why not regex alternation? Because BSD find uses BRE/POSIX regex by default, and the -E extend switch is not supported by GNU find....
  lines, = Open3.capture3("find #{$IMAGE_PATH} -type f \\( -iregex \".*\\.png\" -o -iregex \".*\\.jpg\" -o -iregex \".*\\.jpeg\" -o -iregex \".*\\.gif\" -o -iregex \".*\\.webp\" \\)")
  for line in lines.split(/\n/)
    puts "\r"+line
    _, _, status = Open3.capture3("#{Exiftool.command} #{line} | grep -v 'ExifTool Version Number\\|Exif Byte Order\\|Exif Version' | grep -q '^Exif '")
    exif_files.append(line) if status == 0
    puts "\033[A\r\33[2K\033[A"
    if status == 0
      puts "Found EXIF data in #{line}"
    end
  end
  return exif_files
end

desc "Find images under #{$IMAGE_PATH} that contain EXIF data."
task :exif_find do
  puts "Looking for EXIF data in #{$IMAGE_PATH}/..."
  find_exif_files()
end

desc "Remove EXIF data from all images in #{$IMAGE_PATH}/"
task :exif_clean do
  puts "Removing EXIF data for all images in #{$IMAGE_PATH}/..."
  files = find_exif_files()
  sh "#{Exiftool.command} -all= -tagsFromFile @ -ColorSpaceTags -Orientation -overwrite_original_in_place #{files.join('  ')}" if files.any?
end


desc "Build steps to be used by ci runner"
task :cibuild => %w[build exif_find_fail]


desc "Fail build if there are images under #{$IMAGE_PATH} that contain EXIF data"
task :exif_find_fail do
  puts "Looking for EXIF data in #{$IMAGE_PATH}/..."
  if not find_exif_files().empty?
	fail "Found images containing EXIF data in #{$IMAGE_PATH}"
  end
end
