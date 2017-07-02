$ ->
  $(document).on 'click', '#download_btn', () ->
    track_title = $('#track_id .title').text();
    ga('send', 'event', 'DownloadPage', 'Download', track_title);
    track_id = $('#track_id').data 'track'
    Tunes.download(track_id)
