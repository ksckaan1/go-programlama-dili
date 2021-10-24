# İşletim Sistemini Görme

Go programının çalıştığı işletim sistemi görmek için aşağıdaki kodları yazabilirsiniz.

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {

	if r := runtime.GOOS; r == "windows" {
		fmt.Println("Windows için yönetici olarak çalıştırın.")
	} else if r == "linux" {
		fmt.Println("Linux için sudo komutu ile çalıştırın.")
	} else {
		fmt.Println("Geçersiz işletim sistemi!")
	}
}
```

GNU/Linux kullandığım için çıktım aşağıdaki gibi olacaktır.

> Linux için sudo komutu ile çalıştırın.
