# Dosya Varlığı Kontrolü

Go programımızda kullancağımız bir bir dosyanın varlığını `os` paketi ile kontrol edebiliriz. Örnek programımızı görelim:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	if d := "dosya.txt"; dosyaVarmı(d) {
		fmt.Println(d, "bulunuyor")
	} else {
		fmt.Println(d, "bulunmuyor!")
	}
}

func dosyaVarmı(isim string) bool {
	bilgi, hata := os.Stat(isim)
	if os.IsNotExist(hata) {
		return false
	}
	return !bilgi.IsDir()
}
```

**Gelelim açıklmasına:**

Dosya işlemleri yapabilmek için `os` paketini import ettik. if-else akışında geçici değişken olarak `d` değişkenine `"dosya.txt"` atayarak kontrol edilecek dosyamızın ismini belirledik.

Bu akışta `dosyaVarmı` fonksiyonunda `true` değer dönerse `dosya.txt bulunuyor` olarak çıktı almamız gerekir.

`dosyaVarmı` fonksiyonunu incelediğimizde `bilgi` ve `hata` değişkenlerine `os.Stat` ile dosyanın bilgilerini çektik. `hata` değişkeni `false` döndürürse fonksiyonun `false` döndürmesini istedik. Aynı şekilde `bilgi.IsDir()` ile dosya değil de bir dizinse `false` döndürmesini istedik.
