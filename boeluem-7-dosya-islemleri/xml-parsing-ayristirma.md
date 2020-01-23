# XML Parsing \(Ayrıştırma\)

Bu yazımıza Golang üzerinde **XML** dosyalarını işlemeyi öğreneceğiz. Bu işlemin yapabileceğimiz hali hazırda standart Golang paketleri ile gelen **“encoding/xml”** paketi vardır. Örneğimize geçelim.  
**veri.xml** isminde aşağıdaki gibi bir belgemiz olduğunu varsayalım.

```markup
<?xml version="1.0" encoding="UTF-8"?>
<üyeler>
    <üye tip="admin">
        <isim>Ahmet</isim>
        <sosyal>
            <facebook>https://facebook.com</facebook>
            <twitter>https://twitter.com</twitter>
            <youtube>https://youtube.com</youtube>
        </sosyal>
    </üye>
    <üye tip="okuyucu">
        <isim>Mehmet</isim>
        <sosyal>
            <facebook>https://facebook.com</facebook>
            <twitter>https://twitter.com</twitter>
            <youtube>https://youtube.com</youtube>
        </sosyal>
    </üye>
</üyeler>
```

**XML Belgemizi Okuyalım**

Bu işlemimizi yaparken **“io/ioutil”** ve **“os”** paketlerimizden faydalanacağız. Hemen kodlarımızı görelim.

```go
package main
import (
	"fmt"
	"os"
)
func main() {
	// XML dosyamızı açıyoruz
	xmlDosya, err := os.Open("veri.xml")
	// Hata var mı diye kontrol ediyoruz
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("veri.xml dosyası başarıyla açıldı")
	// XML dosyamızı kapatmayı unutmuyoruz.
	defer xmlDosya.Close()
}
```

Eğer XML dosyası açılırken hata oluşmazsa çıktımız olumlu yönde olacaktır.  
Şimde XML dosyasındaki verileri struct’ımıza kaydedelim. Parsing işlemi de yapacağımızdan dolayı **“encoding/xml”** paketini de içe aktarıyoruz. Hemen kodumuz geliyor.

```go
package main
import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"
)
type Üyeler struct {
	Alan   xml.Name `xml:"üyeler"`
	Üyeler []Üye    `xml:"üye"`
}
type Üye struct {
	Alan   xml.Name `xml:"üye"`
	Tip    string   `xml:"tip,attr"`
	İsim   string   `xml:"isim"`
	Sosyal Sosyal   `xml:"sosyal"`
}
type Sosyal struct {
	Alan     xml.Name `xml:"sosyal"`
	Facebook string   `xml:"facebook"`
	Twitter  string   `xml:"twitter"`
	Youtube  string   `xml:"youtube"`
}
func main() {
	// XML dosyamızı açıyoruz
	xmlDosya, err := os.Open("veri.xml")
	// Hata var mı diye kontrol ediyoruz
	if err != nil {
		fmt.Println(err)
	}
	// XML dosyamızı kapatmayı unutmuyoruz.
	defer xmlDosya.Close()
	//XML dosyamızı okuyoruz (byte olarak geliyor)
	byteDeğer, _ := ioutil.ReadAll(xmlDosya)
	//Yerleştirme işlemi için değişken oluşturuyoruz.
	var üyeler Üyeler
	xml.Unmarshal(byteDeğer, &üyeler)
	fmt.Println(üyeler.Üyeler)
}
```

