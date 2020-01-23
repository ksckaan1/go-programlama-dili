# Komut Satırı Bayrakları \(Flags\)

Komut satırı bayrakları, örnek olarak;

> ./uygulamamız -h

Sondaki `-h` bir flag\(bayrak\)’dir. Örnek bir program yazalım.

```go
package main
import (
	"flag"
	"fmt"
)
func main() {
	kelime := flag.String("kelime", "varsayılan kelime", "metin tipinde")
	sayi := flag.Int("sayi", 1881, "sayı tipinde")
	mantiksal := flag.Bool("mantiksal", false, "boolean tipinde")
	flag.Parse()
	fmt.Println("kelime:", *kelime)
	fmt.Println("sayi:", *sayi)
	fmt.Println("mantiksal:", *mantiksal)
}
```

Gelelim açıklamasına;  
**kelime** isminde **string** tipinde bir flag oluşturduk. **flag.String\(\)** fonksiyonu içerisinde 1. parametre komut satırından **“-kelime”** argümanıyla gireceğimizi gösteriyor. Varsayılan değeri **“varsayılan kelime”** olacak ve açıklama bölümünde **“metin tipinde”** yazacak.  
**sayi** isminde **int** tipinde bir flag oluşturduk. **flag.Int\(\)** fonksiyonu içerisinde komut satırından **“-sayi”** argümanıyla gireceğimizi belirttik. Varsayılan değeri **1881** olacak ve açıklama bölümünde **“sayı tipinde”** yazacak.  
**mantiksal** isminde **bool** tipinde bir flag oluşturduk. **flag.Bool\(\)** fonksiyonunda **“-mantiksal”** argumanıyla çağırılacağını belirttik. Varsayılan değeri **false** olacak ve açıklama bölümünde **“boolean tipinde”** yazacak.  
Uygulamamızı build edelim ve ismi **uygulama** olsun.

> go build -o ./uygulama .

Windows için build ediyorsanız, `./uygulama` yerine `./uygulama.exe` yazarak build edin. \(Hatırlatma yapayım dedim\) Build ettikten sonra örnek bir kullanımını yapalım.

> ./uygulama -kelime=Atatürk -sayi=1881 -mantiksal=true

Çıktımız şu şekilde olacaktır.

> kelime: Atatürk  
> sayi: 1881  
> mantiksal: true

Peki bu girdiğimiz flag açıklamaları ne oluyor diye soracak olursanız eğer, onu da aşağıdaki komutu yazarak görebilirsiniz.

> ./uygulama -h

Çıktımız şu şekilde olacaktır.

> Usage of ./uygulama:  
>   -kelime string  
>         metin tipinde \(default "varsayılan kelime"\)  
>   -mantiksal  
>         boolean tipinde \(default false"\)  
>   -sayi int  
>         sayı tipinde \(default 1881\)

