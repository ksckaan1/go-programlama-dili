# Komut Satırı Argümanları \(Args\)

Golang ile programlarımızın komut satırı üzerinden argümanlar ile çalışmasını sağlayabiliriz. İşte paketimiz:

```text
import "os"
```

`os` paketimizdeki `Args` fonksiyonu bize string dizi sunar. ****Bir örnek görelim.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	for i, arg := range os.Args {
		fmt.Println(i, "=", arg)
	}
}
```

`for-range` ile `os.Args`'ın uzunluğu kadar işlem yapıyoruz ve içerisindekileri indeksi ile ekrana bastırıyoruz. Şöyle bir çıktımız oluyor:

> ./main naber nasılsın
>
> 0 = ./main  
> 1 = naber  
> 2 = nasılsın

