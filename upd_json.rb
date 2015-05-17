require 'taglib'
require 'audioinfo'
require 'csv'
require 'json'
require 'ap'

base_dir = "/Users/syon/Dropbox/sion_andy/音の園/materials（リリース版）/"
json_dir = "source/tracklists/"

#
# Write info on mp3 file with CSV
#
csv = CSV.table(json_dir + "_def.tsv", col_sep:"\t")
musics = {}
csv.map do |df|
  music = {}
  cate_id = df[:filename]
  path = base_dir + cate_id
  begin
    AudioInfo.open(path) do |info|
      music[:time] = info.length
    end
  rescue
  end

  TagLib::MPEG::File.open(path) do |file|
    ## Cannot embed Japanese...
    ## cf. http://www.rubydoc.info/gems/taglib-ruby/TagLib/ID3v2/Tag
    # tag = file.id3v2_tag
    # tag.title  = df[:title]
    # z = tag.frame_list('TIT2').first
    # z.text = df[:title]
    # z.text_encoding = TagLib::String::UTF8
    tag = file.tag
    tag.title  = df[:title]
    tag.artist = df[:artist]
    tag.album  = df[:album]
    file.save
  end

  music[:title]  = df[:title]
  music[:artist] = df[:artist]
  music[:album]  = df[:album]
  music[:tags]   = df[:tags].split "/"

  musics[cate_id] = music
end

#
# Update tracklist json
#
open(json_dir + "_structure.json") do |io|
  categories = JSON.load(io)
  categories.each do |cate|
    cate_name = cate.keys.first
    category = {listname: cate[cate_name].listname, tracks: []}
    cate[cate_name].tracks.each do |filename|
      music = musics[filename]
      next unless music
      track = {
        :filepath => "/materials/#{filename}",
        :title => music[:title],
        :time => music[:time],
        :tags => music[:tags]
      }
      category[:tracks].push(track)
    end

    jpath = json_dir + "#{cate_name}.json"
    json_data = JSON.pretty_generate(category)
    open(jpath, 'w') do |io|
      io.write json_data
    end
  end
end
