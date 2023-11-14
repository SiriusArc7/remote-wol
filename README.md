# remote-wol
LANのraspiからメインPCにwake-on-lanする想定のもの

# 使い方
1. config.json.templateをconfig.jsonにリネームするなりコピーするなり
2. wake-on-lanしたい対象のMACアドレスを"macAddress"に指定する
3. "postValue"はいわゆる合言葉
4. index.jsのL16 L17で起動時間に制約をかけています　自分の用途としては帰宅している最中にWoLできればいい感じなので、よしなに値を書き換えたらいいと思います

# 自分の使い方
- MacroDroidで自分が指定のエリアに入ったら、自宅のraspiに対してHTTP Request POSTを自動で投げるようにしてあります
