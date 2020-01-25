# Bir Dizindeki Dosya ve Klasörleri Sıralama

Golang üzerinde adresini belirlediğimiz bir dizindeki dosya ve klasörleri listelemeyi göreceğiz. Örneğimize geçelim:

```go
package main
import (
	"fmt"
	"os"
)
func diziniOku(d string) {
	dizin, err := os.Open(d)
	if err != nil {
		fmt.Println("Dizin bulunamadı!")
		os.Exit(1)
	}
	defer dizin.Close()
	liste, _ := dizin.Readdirnames(0) // Açıklamada okuyun
	for _, isim := range liste {
		fmt.Println(isim)
	}
	fmt.Printf("Toplamda %d içerik bulundu.\n", len(liste))
}
func main() {
	diziniOku(".")
}
```

Yukarıdaki kodlarımızın açıklamasını görelim:  
Öncelikle **“os”** paketimizi içe aktarıyoruz. **diziniOku\(\)** fonksiyonumuzun içerisinde **dizin** adında değişken oluşturduk ve bu değişkende fonksiyonumuza **d** argümanı ile gelecek olan dizinimizi açtık. Eğer bir hata ile karşılaşırsak diye hata yakalama işlemini yaptık.  
Daha sonra **dizin** değişkenimizi **defer** ile kapattık.  
**liste** adında değişken oluşturduk. Bu değişkenimizin içerisine **dizin.Readdirnames\(0\)** diyerek tüm dosya ve klasörleri bu değişkenimizin içerisine attık. Burada sıfır kullanmamızın sebebi tüm dosya ve klasörleri okuyabilmek içindir.  
   
Hemen aşağısında **for** ve **range** ile **liste** değişkenimizdeki dosya ve klasör isimlerini isim değişkenimize bastırmak istedik. Her dosya ve klasör ayrı ayrı isim değişkenimize atandı ve ekrana bastırılmış oldu.  
   
Daha sonra **diziniOku\(\)** fonksiyonumuzun en altında **len\(liste\)** ile dosya sayımızı öğrenerek ekrana bastırdık.  
   
**main\(\)** fonksiyonumuzda ise **diziniOku\(“.”\)** diyerek nokta ile bulunduğumuz dizini okuttuk.

