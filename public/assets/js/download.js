$(function() {
  return $(document).on('click', '#download_btn', function() {
    var track_id, track_title;
    track_title = $('#track_id .title').text();
    ga('send', 'event', 'DownloadPage', 'Download', track_title);
    track_id = $('#track_id').data('track');
    return Tunes.download(track_id);
  });
});
