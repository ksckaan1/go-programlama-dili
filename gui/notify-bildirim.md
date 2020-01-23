# notify \(Bildirim\)

Bazen programımızda kullanıcını haberdar olması için bildirim özelliği gerekir. Bu özelliği `notify` paketi ile kazandırabiliriz.

> go get github.com/martinlindhe/notify

Paketi indirdikten sonra, aşağıdaki kodları deneyebilirsiniz.

```go
package main

import "github.com/martinlindhe/notify"

func main() {
	// Bildirim Gösterme
	notify.Notify("Uygulama İsmi", "Başlık", "Açıklama", "icon/yolu.png")

	// Sesli Bilgirim Gösterme
	notify.Alert("Uygulama İsmi", "Başlık", "Açıklama", "icon/yolu.png")
}
```

![GNU/Linux \(Ubuntu&apos;da\)](../.gitbook/assets/linux.png)

![macOS / OSX 10.8+](../.gitbook/assets/macos-1.png)

![Windows 10](../.gitbook/assets/windows-1.png)

