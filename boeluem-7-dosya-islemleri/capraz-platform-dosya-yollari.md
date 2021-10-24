# Çapraz Platform Dosya Yolları

Bir işletim sisteminde dosyanın veya dizinin yolunu belirtmek için taksim veya ters-taksim işaretleri kullanırız. Fakat yazağımız program çapraz-platformsa bu durumda ne yapmamız gerekir?

Ya kendimiz bunun için bir fonksiyon oluşturacağız ya da kısa yoldan `os.PathSeperator`'ı kullanabiliriz.

Hemen örneğimizi görelim:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	s := string(os.PathSeparator)
	yol := "dosyalar" + s + "muzikler"
	fmt.Println(yol)
}
```

{% hint style="info" %}
Her seferinde `string(os.PathSeperator)` yazmamak için `s` değişkenine atayarak kısalttık.
{% endhint %}

Windows için çıktımız:

> dosyalar\muzikler

Unix-Like için çıktımız:

> dosyalar/muzikler
