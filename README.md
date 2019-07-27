# test-electron-rtsp

## 注意事项：

可以直接播放视频文件流，将 /src/main/index.js 中的视频文件路径改为自己的视频文件路径即可

```diff
- url = `G:\\影视\\长安十二时辰\\The.Longest.Day.In.Chang'an.2019.Complete.1080p.WEB-DL.H264.AAC-TJUPT\\The.Longest.Day.In.Chang'an.2019.E0${parseInt(req.params.id).toFixed(0)}.1080p.WEB-DL.H264.AAC-TJUPT.mp4`
+ url = ``
```

直接使用 VLC 串流的 RTSP 流不能直接打开，最好直接用海康的视频流。