# net/http ile Web Server Oluşturma

Golang’ta web sunucusu oluşturma çok basit bir işlemdir.\
İlk örneğimizde **localhost:5555** üzerinde çalışacak olan bir web sunucusu oluşturacağız.

```go
package main 
import (
    "fmt"
    "net/http"
)
 
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Merhaba %s", r.URL.Path[1:])
}
 
func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":5555", nil)
 
    fmt.Println("Web Sunucu")
}
```

Tarayıcınız üzerinden **localhost:5555**‘e girdiğinizde sayfada sadece **Merhaba** yazdığını göreceksiniz. Daha sonra adrese **/ahmet **yazıp girdiğiniz zaman yazının **Merhaba ahmet** olarak değiştiğini göreceksiniz.\


**Peki bu olayın açıklaması nedir?**\
**main() **fonksiyonunun içerisinde 2 temel fonksiyon bulunuyor. **HandleFunc()** fonksiyonu belirlediğimiz adrese girildiğinde hangi fonksiyonun çalıştırılacağınız belirliyor. **ListenAndServe()** fonksiyonu ise sunucunun ayağa kalkmasını ve istediğimiz bir porttan ulaşılmasını sağlıyor.\
Eğer sunucuya dosya verme yoluyla işlem yapmasını istiyorsak aşağıdaki yönteme başvurmalıyız.\
**index.html** adında bir dosya oluşturuyoruz. İçine aşağıdakileri yazıyoruz ve kaydediyoruz.

```markup
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Sayfa Başlığı</title>
</head>
<body>
    Merhaba Dünya
</body>
</html>
```

Şimde de sunucu işlemlerini gerçekleştireceğimiz **main.go** dosyamızı oluşturalım.

```go
package main 
import (
    "fmt"
    "io/ioutil"
    "net/http"
)
 
func loadFile(fileName string) (string, error) {
    bytes, err := ioutil.ReadFile(fileName)
    if err != nil {
        return "", err
    }
    return string(bytes), nil
}
 
func handler(w http.ResponseWriter, r *http.Request) {
    var body, _ = loadFile("index.html")
    fmt.Fprintf(w, body)
}
 
func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":5555", nil)
}
```

Tarayıcıdan **localhost:5555** adresine girdiğimiz zaman oluşturmuş olduğumuz **index.html** dosyasının görüntülendiğini göreceksiniz.\
Açıklayacak olursak eğer;\
**loadFile()** fonksiyonumuz **index.html** programa aktarıldığında **byte** türünde olduğu için onu okuyabileceğimiz **string** türüne çevirdi. Bu özellik programımıza **“io/ioutil”** paketi sayesinde eklendi. Geri kalan kısımdan zaten yukarıda bahsetmiştik.
