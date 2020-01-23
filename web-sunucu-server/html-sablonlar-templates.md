# HTML Şablonlar \(Templates\)

Golang’ta HTML sayfalarına öğe yerleştirmek için şabloblar kullanılır. Bu işlemin uygulanışı, .html dosyamızın içinde Golang tarafından gelecek öğeler için işaret bırakırız. Bu işaret bu şekilde olur: `{{ kodumuz }}`  
Hemen bir örnek ile olayı anlayalım. **main.go** dosyamız şöyle olsun.

```go
package main
import (
	"fmt"
	"html/template"
	"net/http"
)
// SayfaBilgi ...
type SayfaBilgi struct {
	Başlık string
	İçerik string
}
func anasayfa(w http.ResponseWriter, r *http.Request) {
	sayfa := SayfaBilgi{Başlık: "Golang Türkiye", İçerik: "Sitemize Hoşgeldiniz"}
	şablon, _ := template.ParseFiles("sablonumuz.html")
	şablon.Execute(w, sayfa)
}
func main() {
	fmt.Println("Program Başladı")
	http.HandleFunc("/", anasayfa)
	http.ListenAndServe(":8000", nil)
}
```

İlk olarak sunucu oluşturacağımız için **“net/html”** ve şablon oluşturacağımız için de **“html/template”** paketlerini içe aktarıyoruz.  
**SayfaBilgi** adında bir **struct** metod oluşturuyoruz ve içerisine **string** değer alan **Başlık** ve **İçerik** türünü oluşturuyoruz. Bunu yapmamızın sebebi web sayfamızda sayfamızın başlığını ve içeriğini bunlar aracılığıyla şablona göndereceğiz.  
**anasayfa** adında fonksiyonumuzun içerisini inceleyelim. Bu fonksiyonumuz bir sayfa yakalayıcı fonksiyondur. **net/http** paketi için alttaki konuyu okuyabilirsiniz.

{% page-ref page="net-http-ile-web-server-olusturma.md" %}

**sayfa** adında değişken oluşturuyoruz ve bu değişkenin **SayfaBilgi** strunct’ından olduğunu belirtip içerisine sayfa bilgilerimizi giriyoruz.  
**şablon** değişkeni oluşturduk. \(\_ alt tire yerine hata bilgilerini alan değişken koyabilirsiniz.\) **template.ParseFiles\(\)** fonksiyonu ile HTML şablonumuzu tanıttık.  
Hemen altında şablonumuzu çalıştırması için **Execute\(\)** fonksiyonundan yaralandık.  
**main\(\)** fonksiyonumda ise klasik bir server ayağa kaldırma kodları yer alıyor.  
Şimdi de **sablonumuz.html** dosyasını görelim.

```markup
<h1>{{.Başlık}}</h1>
{{.İçerik}}
```

Süslü parantezler içerisin **nokta** ile başlayan değişken yerleştirmelerini yapıyoruz. Bu değişkenler bize **SayfaBilgi** struct’ından gelmektedir.  
   
Seviyeyi biraz daha yükseltelim ve listeleme işlemi yapalım.  
**main.go** dosyamızı aşağıdaki gibi oluşturalım.

```go
package main
import (
	"fmt"
	"html/template"
	"net/http"
)
// Görev ...
type Görev struct {
	İsim       string
	Tamamlandı bool
}
// SayfaVerisi ...
type SayfaVerisi struct {
	Sayfaİsmi    string
	GörevListesi []Görev
}
func anasayfa(w http.ResponseWriter, r *http.Request) {
	sayfa := SayfaVerisi{
		Sayfaİsmi: "Görevler Listesi",
		GörevListesi: []Görev{
			{İsim: "Ekmek Al", Tamamlandı: false},
			{İsim: "Kola Al", Tamamlandı: true},
			{İsim: "Yoğurt Al", Tamamlandı: false},
		},
	}
	şablon, _ := template.ParseFiles("sablonumuz.html")
	şablon.Execute(w, sayfa)
}
func main() {
	fmt.Println("Program Başladı")
	http.HandleFunc("/", anasayfa)
	http.ListenAndServe(":8000", nil)
}
```

Bu sefer farkettiyseniz 2 tane struct metodumuz var. **Görev** struct’ımız içerisinde 2 tane değişkene ev sahipliği yapacak. **SayfaVerisi** struct’ında ise **Sayfaİsmi** ve **GörevListesi** adında elemanlar var. **GörevListesi** elemanı **Görev** struct’ı türündedir. Bu sayede içerisine dizi olarak görevler kaydedebileceğiz.  
Bir önceki örnekteki gibi **anasayfa** yakalayıcı fonksiyonumuzu oluşturuyoruz. İçerisinde **sayfa** isminde değişken oluşturuyoruz. Bu değişken içerisine sayfamızda görünmesini istediğimiz **Sayfaİsmi** ve **GörevListesi** elemanlarını giriyoruz. Hemen aşağısında ise şablonumuzu bağlama işlemlerini yapıyoruz.  
**main\(\)** fonksiyonumuz ise bir önceki örnek ile aynıdır.  
Şimdide **sablonumuz.html** dosyasını görelim.

```markup

<style>
.kirmizi{
    color:red;
}
.yesil{
    color:green;
}
</style>
<h1>{{.Sayfaİsmi}}</h1>
<ul>
    {{range .GörevListesi}}
        {{if .Tamamlandı}}
            <li class="yesil">{{.İsim}}</li>
        {{else}}
            <li class="kirmizi">{{.İsim}}</li>
        {{end}}
    {{end}}
</ul>
```

Yukarıdaki kodları incelediğinizde içerisinde **range**, **if**, **else** ve **end** gibi kelimeler göreceksiniz. **range** anahtar kelimesi Golang’taki gibi belirtilen dizinin uzunluğu kadar sıralama işlemi yapar. **{{range}}** anahtar kelimesi mutlaka **{{end}}** ile kapatılmalıdır. if-else akışının ne işe yaradığını zaten biliyorsunuzdur. Aynı şekilde **{{end}}** ile kapatılmalıdır.  
Bu işlemlerin sonunda elimize şöyle bir sonuç gemiş olacaktır.  
Tarayıcımızda http://localhost:8000 adresini açıyoruz.

## Görevler Listesi

* Ekmek Al
* Kola Al
* Yoğurt Al



**İşte kullanabileceğimiz bazı şablon kodları:**  


| Şablon Kodu | Açıklama |
| :--- | :--- |
| {{/\* yorum \*/}} | Yorum yapmak için kullanılır. |
| {{.}} | Golang’tan ana değişken için kullanılır. |
| {{.Değişkenİsmi}} | Golang’tan belirli bir değişken almak için kullanılır. |
| {{if .Tamamlandı}} {{else}} {{end}} | If-Else akışı için kullanılır. |
| {{block “içerik” .}} {{end}} | İçerik ismine bloklama tanımlar. |
| {{range .Görevler}} {{.}} {{end}} | Dizi sıralamak için kullanılır. |

