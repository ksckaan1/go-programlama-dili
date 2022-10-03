# JSON Parsing (Ayrıştırma)

{% hint style="info" %}
Yazıya başlamadan önce bu konuyu yazdığı için **Latif Uluman**'a ([@latif70427517](https://twitter.com/latif70427517)) teşekkürlerimi sunarım.
{% endhint %}

Bugünkü yazımızda _Golang_ ile _**JSON**_ parse etmeye bakacağız. Hepimizin bildiği gibi günümüzde bir _API_ (_application programming interface_) a veri göndermede ya da veri çekmede en sık kullanılan veri formatı _JSON_ (_javascript object notation_) dur. _Golang_ ile de kendi oluşturduğumuz verimizi (_Golang struct_) _JSON’a_ dönüştürüp bir _API’a_ request olarak gönderebilir ya da bir _API’dan_ gelen _JSON_ verisini Go programımızda kullanabiliriz.  O halde çok uzatmadan Go programımızdaki verileri nasıl _JSON’a_ dönüştürüz hemen bakalım:

**MARSHALLING (Sıralama)**

Evet Go programında _Go struct’ını_ JSON stringine dönüştürmek için **“encoding”** altındaki **“json”** paketini kullanıyoruz.  Kullanıma ait kod örneği aşağıdaki gibidir.

```go
package main
import (
	"encoding/json"
	"fmt"
	"log"
)
type kişi struct {
	isim    string
	soyisim string
	yaş     int
}
func main() {
	ali := kişi{
		isim:    "Ali",
		soyisim: "Veli",
		yaş:     20,
	}
	veri, err := json.Marshal(ali)
	if err != nil {
		log.Fatalln(err)
		return
	}
	fmt.Printf("JSON Parse Sonucu: %s", string(veri))
}
```

&#x20;\
Şimdi de kodumuzu çalıştıralım ve sonucu görelim:

> JSON Parse Sonucu: {}

Çıktımıza baktığımızda bir hata olmamasına rağmen JSON string’i boş görüyoruz. Yani marshalling başarılı olmuş gözüküyor; fakat boş bir struct’ı marshal etmiş gibi gözüküyor.\
Evet durum tam da böyle. JSON marshal **sadece dışa aktarılmış (exported)** verileri marshal eder. Bildiğimiz gibi Golang’de export etmek için değişken ismi büyük harfle yazılmalıdır. İlk kodumuzda struct elemanlarının baş harflerini  küçük yazdığımız için hiçbiri export edilmedi. Bu yüzden aslında boş bir struct ı marshal etmeye çalışıyoruz gibi algıladı Json.Marshal() fonksiyonu. Doğal olarak geriye boş bir JSON döndü. Haydi şimdi struct elemanlarının tamamını export ederek yani ilk harflerini büyük yazarak test edelim:

```go
package main
import (
	"encoding/json"
	"fmt"
	"log"
)
type kişi struct {
	İsim    string
	Soyisim string
	Yaş     int
}
func main() {
	ali := kişi{
		İsim:    "Ali",
		Soyisim: "Veli",
		Yaş:     20,
	}
	veri, err := json.Marshal(ali)
	if err != nil {
		log.Fatalln(err)
		return
	}
	fmt.Printf("JSON Parse Sonucu: %s", string(veri))
}
```

Ve tekrar kodumuzu derleyelim ve sonucu görelim:

> JSON Parse Sonucu: {"İsim":"Ali","Soyisim":"Veli","Yaş":20}

Evet arkadaşlar görüldüğü gibi kodumuz çalıştı. Şimdi kısaca açıklayalım programımızı:\
**7-11** satırlarda kendi **“kişi”** tipimizi oluşturduk.  **13-17** satırlarda bu tipte bir örnek oluşturduk ve **ali** değişkenine atadık.  Daha sonra ali değişkenimizi **json.Marshal()** fonksiyonu kullanarak JSON’a parse ettik. Bu fonksiyondan bize 2 değer dönmektedir. Bunların bir tanesi **\[]byte** tipinde parse edilen verimiz, diğeri ise **error** tipinde hata durumunu gösteren mesajdır. **19-22** satırlarda hatayı kontrol ettik. Ve son olarak da hatalı değilse ekrana bastık. Tabii bizim datamız \[]byte tipindeydi, bunu daha okunur hale getirmek için string’e dönüştürdük.\
&#x20;\
Evet işte bu kadar. Peki diyelim ki JSON string imizi test etmek istiyoruz ve elimizde oldukça karmaşık bir string var. Bunu tek bir satırda incelemek oldukça zahmetli olabilir. İşte bu durumda imdadımıza **json.MarshalIndent()** fonksiyonu yetişiyor. Kullanımı aşağıdaki gibidir:

```go
func main() {
	ali := kişi{
		İsim:    "Ali",
		Soyisim: "Veli",
		Yaş:     20,
	}
	veri, err := json.MarshalIndent(ali, "", "    ")
	if err != nil {
		log.Fatalln(err)
		return
	}
	fmt.Printf("JSON Parse Sonucu:\n%s", string(veri))
}
```

Görüldüğü gibi JSON için yeni bir fonksiyon kullandık. Dikkatimizi çeken bir şey fonksiyonun ek olarak 2 paremetre içermesidir. Bunlardan ilki yani 2. parametremiz prefix olarak geçmektedir. Yani 2. parametre her satırın başına gelmektedir. 2. si ise yani 3. parametremiz indentation olarak geçmektedir. Ben onu 4 boşluk olarak ayarladım. Şimdi programımızı tekrar çalıştıralım:

> JSON Parse Sonucu:\
> {\
> &#x20;   "İsim": "Ali",\
> &#x20;   "Soyisim": "Veli",\
> &#x20;   "Yaş": 20\
> }

Görüldüğü gibi ekrana basarken indentation ekleyerek bastı.\
Evet **“encoding/json”** paketi ile go struct’ımızı nasıl JSON’a parse edeceğimizi gördük. Artık JSON datamızı istediğimiz gibi kullanabiliriz.\
Peki tam tersi olsaydı nasıl olurdu? Yani elimizde bir JSON verisi var. Bu bir sorgunun sonucu olabilir. Bunu Go struct’ımıza nasıl çevireceğiz? Çözüm: UNMARSHALL

**UNMARSHALL**

Evet arkadaşlar unmarshal işlemi amaç olarak marshal işleminin tam tersidir. Elimizde JSON formatında bir veri vardır ve biz bunu Go struct’ına dönüştürmek istiyoruz. Bunun için **“encoding/json”** paketinde **Unmarshal** fonksiyonunu kullanırız. O halde çok uzatmadan koda bakalım:

```go
package main
import (
	"encoding/json"
	"fmt"
	"log"
)
type kişi struct {
	İsim    string
	Soyisim string
	Yaş     int
}
func main() {
	jsonVeri := []byte(`{"İsim":"Latif","Soyisim":"Uluman","Yaş":23}`)
	var goVeri kişi
	err := json.Unmarshal(jsonVeri, &goVeri)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("İsim - Soyisim: %s %s\nYaş: %d", goVeri.İsim, goVeri.Soyisim, goVeri.Yaş)
}
```

Evet görüldüğü gibi string formatındaki JSON verimizi önce **\[]byte** formatına çevirdik sonra onu **Unmarshal** fonksiyonuna parametre olarak verdik. Sonucu da referansını verdiğimiz kişi türündeki **goVeri** değişkenine yazmak istedik. Ve **goVeri.İsim**, **goVeri.Soyisim** ve **goVeri.Yaş** ile bunlara erişmeye çalıştık. Bakalım sonuçlar nasıl:

> İsim - Soyisim: Latif Uluman\
> Yaş: 23

Görüldüğü gibi Unmarshal işlemi başarılı bir şekilde gerçekleşti.\
Peki bir API’ dan gelen JSON verimize ait özellikleri (attribute) tam olarak bilmeseydik nasıl bir yol izlememiz gerekirdi? Yani biz burada API’ dan isim-soyisim-yas özelliklerinin geleceğini biliyoruz; fakat bunları bilmeyebilirdik. Bu durumda unmarshal ı hangi türden bir veri tipine gerçeklememiz gerekiyor?\
Çözüm: “**map**” . Evet _**map**_ kullanabiliriz. Yani _**key-value**_ (anahtar-değer) ler işimizi görür. Peki türleri ne olmalıdır. “key” ler için düşündüğümüzde bu string olacağı hepimizin aklına gelecektir. Peki Value lar ne olmalıdır? Görüldüğü gibi isim türü string iken, yas integer dı. O halde hepsini karşılayabilen bir veri türü olması lazım. Aklınızda bir şeyler canlanıyor mu? Evet yardımımıza interface yetişiyor. O halde map imizin türü **map\[string]interface{}** olabilir.Hemen bunu da bir kod örneği ile görelim:

```go
package main
import(
    "encoding/json"
    "fmt"
)
func main(){
    jsonVeri := []byte(`{"İsim":"Latif","Soyisim":"Uluman" ,"Yas":23 , "Kilo":80.25}`)
    var goVeri map[string]interface{}
    err := json.Unmarshal(jsonVeri ,&goVeri )
    if (err != nil){
        fmt.Printf("%+v" , err.Error())
        return
    }
    fmt.Printf("İsim: %+v \nSoyisim: %+v \nYas:%+v\nKilo:%+v" , goVeri["İsim"] , goVeri["Soyisim"] , goVeri["Yas"] , goVeri["Kilo"])
}
```

Programımızı çalıştırıp sonucu görelim:

> İsim: Latif\
> Soyisim: Uluman\
> Yas:23\
> Kilo:80.25

Evet görüldüğü gibi farklı türden veri tipleri olan bir json string ini go map ine dönüştürdük ve key değerleri ile de değerlere ulaştık.Evet arkadaşlar bu yazımızda nasıl bir go verisini json verisine döönüştürüp kullanacağımızı ya da tam tersi json verisini go verisine dönüştüreceğimizi gördük.
