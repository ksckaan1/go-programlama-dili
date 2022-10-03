# Efektif Go

{% hint style="info" %}
Bu sayfa 28.08.2022 tarihinde [Effective Go](https://go.dev/doc/effective\_go) adlı yazıdan tercüme edilmiştir.
{% endhint %}

## Giriş

Go yeni bir dildir. Mevcut dillerden fikirler ödünç almasına rağmen, efektif _(etkili)_ yazılmış Go programlarını, muadili olduğu diğer dillerde yazılmış olan programlardan farklı kılan olağandışı özelliklere sahiptir. Bir C++ veya Java programının Go'ya doğrudan çevirisinin tatmin edici bir sonuç vermesi pek olası değildir. Java programları Go ile değil Java ile yazılır. Öte yandan, sorunu Go perspektifinden düşünmek, başarılı ancak oldukça farklı bir program üretebilir. Diğer bir deyişle, iyi bir şekilde Go yazmak, Go'nun özelliklerini ve kullanım tarzını iyi anlamaktan geçer. Yazdığınız programları diğer Go programcılarının anlamasını kolaylaştırmak için, isimlendirme, yazılacak programın yapısını belirleme ve biçimlendirme gibi kuralları bilmek önemlidir.

Bu belge, anlaşılır _(temiz)_, deyimsel Go kodu yazmak için ipuçları verir ve [dil belirtimi](https://go.dev/ref/spec), [Go Turu](https://go.dev/tour/welcome/1) ve [Go Kodu Nasıl Yazılır?](https://go.dev/doc/code.html) gibi konuların genişletilmiş halini içerir.

Ocak 2022'de eklenen not: Bu belge, Go'nun 2009'da piyasaya sürülmesi için yazılmıştır ve o zamandan beri önemli ölçüde güncellenmemiştir. Dilin kendisinin nasıl kullanılacağını anlamak için iyi bir rehber olmasına rağmen, dilin kararlılığı sayesinde kütüphaneler hakkında çok az şey söylüyor ve yazıldığından bu yana Go ekosisteminde yapılan derleme sistemi, test etme, modüller ve polimorfizm gibi önemli değişiklikler hakkında hiçbir şey söylemiyor. Buradaki bilgiler okuyucuya faydalı olacaktır fakat yazılanlar eksiksiz olmadığını anlamanızda fayda var. Bu konu hakkında bir açıklama için Rob Pike'ın açtığı issue olan [bu adresi](https://github.com/golang/go/issues/28782) ziyaret edebilirsiniz. _(Kısaca, kütüphaneler üzerinden konuşmanın, başlangıçta Go'yu anlatmanın doğru bir yolu olmadığından bahsediyor.)_

### Örnekler

[Go paketi kaynakları](https://go.dev/src/), yalnızca temel kütüphane olarak değil, aynı zamanda dilin nasıl kullanılacağına ilişkin örnekler olarak da hizmet etmeyi amaçlamaktadır. Ayrıca, paketlerin birçoğu, [bunun gibi](https://go.dev/pkg/strings/#example\_Map) doğrudan [golang.org](https://golang.org/) web sitesinden çalıştırabileceğiniz çalışan, bağımsız yürütülebilir örnekler içerir _(Yer alan konuyu denemek için **Örnek** kısmına göz atabilirsiniz)_. Bir soruna nasıl yaklaşılacağı veya bir şeyin nasıl uygulanabileceği hakkında bir sorunuz varsa, kitaplıktaki belgeler, kodlar ve örnekler sizlere cevaplar, fikirler ve arka plan sağlayabilir.

## Biçimlendirme _(Formatting)_

Biçimlendirme sorunları en tartışmalı ancak en az sonuç doğuran sorunlardır. İnsanlar farklı biçimlendirme stillerine uyum sağlayabilir, ancak gerekmemeleri daha iyidir ve herkes aynı stile bağlı kalırsa konuya daha az zaman ayrılır. Sorun, bu Ütopya'ya uzun bir kuralcı stil kılavuzu olmadan nasıl yaklaşılacağıdır.

Go ile alışılmadık bir yaklaşım izliyoruz ve çoğu biçimlendirme sorununu makinenin halletmesine izin veriyoruz. `gofmt` programı _(aynı zamanda kaynak dosya düzeyinden ziyade paket düzeyinde çalışan `go fmt` olarak da mevcuttur)_ bir Go programını okur ve kaynağı standart bir girinti _(indent)_ ve dikey hizalama stilinde yayar, yorumları korur ve gerekirse yeniden biçimlendirir. Eğer kendiniz de denemek isterseniz `gofmt` komutunu çalıştırabilirsiniz ve karşılaştığınız sonuç beklentinizi karşılamıyor ise yazdığınız kodları değiştirebilir _(hatalı bir çıktı olduğunu düşünüyorsanız hata bildiriminde bulunabilirsiniz)_ veya bu yöntemi uygulamaktan vazgeçebilirsiniz.

Örnek olarak bir struct'ın alanlarındaki yorumları hizalamak için zaman harcamanıza gerek yoktur. Bunu `gofmt` sizin için yapabilir. Örnek bir girdi:

```go
type T struct {
    name string // name of the object
    value int // its value
}
```

`gofmt`'den sonra aşağıdaki gibi olacaktır.

```go
type T struct {
    name    string // name of the object
    value   int    // its value
}
```

Standart paketlerdeki tüm Go kodları `gofmt` ile biçimlendirilmiştir.

Diğer biçimlendirme özelliklerine kısaca değinelim:

#### Girintileme

Girinti için tab kullanıyoruz ve `gofmt` bunları varsayılan olarak yayar. Boşlukları yalnızca gerekiyorsa kullanın.

#### Satır Uzunluğu

Go'da satır uzunluğu limitli değildir. Uzunluktan kaynaklı satırın ekrana sığmamasından endişelenmeyin. Girinti ile beraber alt satırdan kodunuza devam edebilirsiniz.

#### Parantezler

Go, C ve Java'dan daha az parantez gerektirir: kontrol yapıları _(if, for, switch)_ sözdizimlerinde parantez içermez. Ayrıca, operatör öncelik hiyerarşisi daha kısa ve nettir, aşağıdaki gibi,

```go
x<<8 + y<<16
```

Örnekteki gibi diğer dillerden farklı olarak, aralığın ne anlama geldiğini anlayabilir.

## Yorumlar

Go, C stili `/* */` blok yorumları ve C++ stili `//` satır yorumları sağlar. Satır yorumları normdur; blok yorumları çoğunlukla paket yorumları olarak görünür, ancak bir ifade içinde veya büyük kod alanlarını devre dışı bırakmak için kullanışlıdır.

Üst düzey tanımlamarın üstüne yazılan yorum satırları eğer arada satır boşluk yoksa tanımlamanın belgesi olma görevini görür. Bu "belge yorumları", belirli bir Go paketi veya komutu için birincil belgelerdir. Doküman yorumları hakkında daha fazla bilgi için bkz. [Go Doc Yorumlar](https://go.dev/doc/comment)

## İsimler

İsimler Go'da diğer dillerde olduğu kadar önemlidir. Hatta anlamsal etkileri de vardır: Bir paketin dışında bir adın görünürlüğü, ilk karakterinin büyük harf olup olmadığına göre belirlenir. Bu nedenle, Go programlarındaki adlandırma kuralları hakkında konuşmak için biraz zaman harcamaya değer.

### Paket İsimleri

Bir paket içe aktarıldığında, paket adı içerikler için bir erişimci olur. Sonrasında

```go
import "bytes"
```

şeklinde içe aktarma yapıldığında `bytes.Buffer` olarak kullanıldığında `bytes` paketi içindeki dışa aktarılan `Buffer` kullanılabilir. Paketi kullanan herkesin içeriğine atıfta bulunmak için aynı adı kullanabilmesi yararlıdır, bu da paket adının iyi olması gerektiği anlamına gelir: kısa, öz, çağrışım yapması mantıklı olandır. Kural olarak, paketlere küçük harfli, tek kelimelik adlar verilir; alt çizgiye veya karışık Caps'e _(büyük ve küçük harf karışım kelimeler)_ gerek olmamalıdır. Kısa olmasındaki sebep, paketinizi kullanan herkesin kolaylıkla yazabilecek olmasıdır. Ve paket ismi çakışmaları hakkında önceden endişelenmemiz gerekli değildir. Paket adı, içe aktarma işlemleri için yalnızca varsayılan addır. Tüm kaynak kodlarında benzersiz olması gerekmez ve nadiren bir çakışma durumunda, içe aktarılırken yerel olarak kullanmak için farklı bir ad seçilebilir. Her durumda, karışıklık nadirdir çünkü içe aktarmadaki dosya adı yalnızca hangi paketin kullanıldığını belirler.

Başka bir kural, paket adının kaynak dizininin temel adı olmasıdır. `src/encoding/base64` içindeki paket `encoding/base64` olarak içe aktarılır ancak `base64` adına sahiptir, `encoding_base64` ve `encodingBase64` şeklinde çağrılmaz.

Bir paketin ithalatçısı _(importer)_, içeriğine atıfta bulunmak için import adını kullanır, bu nedenle paketteki dışa aktarılan adlar, tekrarı önlemek için bu yöntemi kullanabilir. _(Test ettikleri paketin dışında çalışması gereken testleri basitleştirebilecek, ancak aksi takdirde kaçınılması gereken `import .` yöntemini kullanmayın.)_. Örneğin, `bufio` paketindeki arabelleğe alınmış okuyucu türüne `BufReader` değil, `Reader` adı verilir, çünkü kullanıcılar bunu açık ve özlü bir ad olan `bufio.Reader` olarak görür. Ayrıca, içe aktarılan varlıklar her zaman paket adlarıyla beraber çağrıldığından, `bufio.Reader` ve `io.Reader` gibi çağırmalar birbirleri ile çakışmaz. Benzer şekilde, yeni `ring.Ring` örneklerini oluşturma işlevi (Go'daki bir kurucunun -constructor- tanımıdır) normalde `NewRing` olarak adlandırılırdı, ancak paket tarafından dışa aktarılan tek tür `Ring` olduğundan ve paket `ring` olarak adlandırıldığından, paketin istemcileri `ring.New` olarak görmesi yeterli olduğu için sadece `New` olarak adlandırılır. İyi isimler seçmenize yardımcı olması için paket yapısını kullanın.

Diğer bir kısa örnek ise `once.Do`; `once.Do(setup)` çağrımı iyi okunur fakat `once.DoOrWaitUntilDone(setup)` gibi bir isimlendirme yapılması önerilmez. Uzun adlar otomatik olarak işleri daha okunaklı hale getirmez. Yararlı bir doküman yorumu, genellikle fazladan uzun bir addan daha değerli olabilir.

### Getters (Alıcılar)

Go, setters _(alıcılar)_ ve setters _(atayıcılar)_ için otomatik destek sağlamaz. Alıcıları ve atayıcıları kendiniz sağlamakta yanlış bir şey yoktur ve bunu yapmak genellikle uygundur, ancak `Get`'i alıcının adına koymak ne deyimsel _(idiomatic)_ ne de gereklidir. Örnek olarak `owner` _(küçük harf, dışa aktarılmamış)_ adında bir alanınız varsa, alıcı yöntemi `GetOwner` değil, `Owner` _(büyük harf, dışa aktarılmış)_ olarak adlandırılmalıdır. Dışa aktarma için büyük harf adlarının kullanılması, hook'un _(burada yapıyı değiştirmeden işlem yapabilmeyi sağlayan araç anlamında kullanılmış)_ struct içerisindeki alanı fonksiyondan ayırt etmesini sağlar. Bu mantığın devamı olarak gerekirse bir atayıcı fonksiyonu muhtemelen `SetOwner` olarak adlandırılacaktır. Her iki isim de pratikte iyi okunuyor:

```go
owner := obj.Owner()
if owner != user {
    obj.SetOwner(user)
}
```

### Interface (Arayüz) İsimleri

Geleneksel olarak, tek fonksiyonlu interface'ler, içerisindeki fonksiyon adında yola çıkılarak bir aracı adı oluşturmak için interface adının sonuna `-er` eki veya benzer bir değişiklikle adlandırılır: `Reader`, `Writer`, `Formatter`, `CloseNotifier` vb.

Bu tür isim kullanımlarını amacı, kapsadıkları fonksiyonların isimlerini kendi _(interface)_ isimlerine atfetmektir. `Read`, `Write`, `Close`, `Flush`, `String` vb. kurallı signature'lara _(fonksiyonun ismi, girdileri ve çıktılarını gösteren imza)_ ve anlamlara sahiptir. Karışıklığı önlemek için, aynı signature `(imza)` ve anlama sahip olmadıkça, fonksiyonunuza bu adlardan birini vermeyin. Tersine, türünüz `(type)` iyi bilinen bir türdeki fonksiyonla aynı anlama sahip bir fonksiyonda uygulanırsa, ona aynı adı veya imzayı vermeyin;  örneğin `string` tipine dönüştürücü fonksiyonunuzu `String` değil `ToString` olarak adlandırın.

### MixedCaps (Büyük-Küçük Karışık İsimlendirme) <a href="#mixed-caps" id="mixed-caps"></a>

Son olarak, Go'daki kural, çok kelimeli adlar yazmak için alt çizgi yerine `MixedCaps` veya `mixedCaps` kullanmaktır.

## Noktalı Virgüller (Semicolons)

Aynı C'deki gibi, Go da biçimsel dilbilgisi ifadeleri sonlandırmak için noktalı virgül kullanır, ancak C'den farklı olarak, bu noktalı virgüller kaynakta görünmez. Bunun yerine lexer _(sözlük)_, tarama yaparken otomatik olarak noktalı virgül eklemek için basit bir kural kullanır, böylece giriş metni _(yani kullanıcının yazdığı kod)_ çoğunlukla bunlardan arınmış olur.

Kural basitçe şudur, satırda veri tipleri _(int, float64 gibi)_ kullanılarak tanılama yapılmış ise, aşağıdaki gibi

```
break continue fallthrough return ++ -- ) }
```

gibi terim veya belirteçler kullanılmış ise lexer her zaman bunların sonlarına noktalı virgül ekler. Bu lexer'ın anladığı dilde “yeni satır, bir ifadeyi sonlandırabilecek bir belirteçten sonra geliyorsa, noktalı virgül eklemeliyim” şeklinde özetlenebilir.

Parantez kapanışından hemen önce noktalı virgül de atlanabilir _(uygulanmayabilir)_, bu nedenle aşağıdaki gibi bir ifade

```go
go func() { for { dst <- <-src } }()
```

üzerinde noktalı virgül gerekli değildir. Deyimsel _(idiomatic)_ Go programlarında, yalnızca başlatıcı _( `i:= 0` gibi)_, koşul _( `i < 10` gibi)_ ve devam öğelerini _( `i++` gibi)_ ayırmak için `for` döngüsü yan tümceleri gibi yerlerde noktalı virgül bulunur. Ayrıca, bu şekilde kod yazmanız durumunda, bir satırdaki birden çok ifadeyi ayırmak için de gereklidirler.

Noktalı virgül ekleme kurallarının bir sonucu, bir kontrol yapısının açılış ayracı _(if, for, switch veya select)_ sonraki satıra koyamamanızdır. Bunu yaparsanız, ayraçtan önce istenmeyen etkilere neden olabilecek bir noktalı virgül eklenir. Bu şekilde yazmanızda bir sıkıntıyla karşılaşmayacakken;

```go
if i < f() {
    g()
}
```

süslü parantezi aşağıda başlatmanız hatalı olacaktır. Örnek bir yanlış görelim;

```go
if i < f()  // yanlış!
{           // yanlış!
    g()
}
```

## Kontrol Yapıları

Go'nun kontrol yapıları, C'dekilerle ilişkilidir, ancak önemli şekillerde farklılık gösterir. `do` veya `while` döngüsü yoktur, yalnızca biraz genelleştirilmiş bir şekli vardır; `switch` daha esnektir; `if` ve `switch`, `for` gibi isteğe bağlı bir başlatma ifadesini kabul eder; `break` ve `continue` ifadeleri, neyin kesileceğini veya devam edileceğini belirlemek için isteğe bağlı bir etiket alır; ve bir tip anahtarı _(switch)_ ve çok yollu iletişim çoklayıcıyı içeren `select` gibi yeni kontrol yapıları vardır. Sözdizimi _(syntax)_ de biraz farklıdır: parantez yoktur ve gövdeler her zaman ayraçla _(süslü parantezlerle)_ sınırlandırılmalıdır.

### If

Go'da basit bir `if` şöyle görünür:

```go
if x > 0 {
    return y
}
```

Zorunlu parantezler, birden çok satırda basit `if` ifadeleri yazmayı teşvik eder. Her halükarda bunu yapmak iyi bir stildir, özellikle de gövde bir `return` veya `break` gibi bir kontrol ifadesi içerdiğinde.

`if` ve `switch` bir başlatma deyimini kabul ettiğinden, yerel bir değişken ayarlamak için kullanılan bir deyimi görmek yaygındır.

```go
if err := file.Chmod(0664); err != nil {
    log.Print(err)
    return err
}
```

Go kütüphanelerinde, bir `if` deyimi sonraki deyimle devam etmediğinde (`else` veya `else if` ile devam etmediğinde), ve gövde `break`, `continue`, `goto` veya `return` ile sona erdiğinde, gereksiz `else`'in atlandığını göreceksiniz.

```go
f, err := os.Open(name)
if err != nil {
    return err
}
codeUsing(f)
```

Bu, kodun bir dizi hata koşuluna karşı koruma sağlaması gereken yaygın bir duruma bir örnektir. Başarılı kontrol akışı sayfa boyunca ilerlerse kod iyi okunur ve ortaya çıkan hata durumlarını ortadan kaldırır. Hata durumları `return` ifadesiyle sona erme eğiliminde olduğundan, ortaya çıkan kodun `else` gibi ifadelere ihtiyacı yoktur.

```go
f, err := os.Open(name)
if err != nil {
    return err
}
d, err := f.Stat()
if err != nil {
    f.Close()
    return err
}
codeUsing(f, d)
```

### Yeniden Tanımlama ve Atama

Önceki bölümdeki son örnek, `:=` kısa tanımlama formunun nasıl çalıştığının bir ayrıntısını gösterir. `os.Open`'ı çağıran tanımlama şöyledir:

```go
f, err := os.Open(name)
```

Bu ifade, `f` ve `err` olmak üzere iki değişken tanımlar. Birkaç satır sonra, `f.Stat`'a yapılan çağrı şöyledir:

```go
d, err := f.Stat()
```

Yukarıda verilen örneklerin alt alta yazıldığında durumlarda, çalışması gayet doğaldır. `f.Stat()` ile tanımlama yapılan yerde yeni bir `d` değişkeni tanımlar, `err` değişkeni ise zaten tanımlı olduğu için `err` değişkenine sadece bir atama yapar.

Bir `:=` kısa tanımlamasında, bir `v` değişkeni, önceden tanımlanmış olsa bile, aşağıdakiler koşuluyla görünebilir:

* bu tanımlama, `v`'nin mevcut tanımlaması ile aynı kapsamdadır _(scope)_ _(`v` zaten bir dış kapsamda tanımlanmışsa, tanımlama yeni bir `§` değişkeni yaratacaktır)_,
* başlatmadaki karşılık gelen değer (if ve switch içi gibi tanımlamalar) `v`'ye atanabilir ve
* tanımlama tarafından oluşturulan en az bir başka değişken vardır.

Bu olağandışı özellik, örneğin uzun bir `if-else` zincirinde tek bir `err` değeri kullanmayı kolaylaştıran saf pragmatizmdir. Sık kullanıldığını göreceksiniz.

Burada, Go'da fonksiyon parametrelerinin kapsamının ve `return` değerlerinin, gövdeyi çevreleyen parantezlerin dışında sözcüksel olarak görünseler de, fonksiyon gövdesiyle aynı olduğunu belirtmekte fayda var.

### For

Go'daki `for` döngüsü C'dekine benzer fakat tam olarak aynısı değildir. Go `for` ve `while`'ı birleştirir ve `do-while`'ı barındırmaz. Yalnızca birinde noktalı virgül bulunan üç formu vardır.

```go
// C'deki for gibi
for init; condition; post { }

// C'deki while gibi
for condition { }

// C'deki for(;;) gibi
for { }
```

Kısa tanımlamalar, index değişkenini doğrudan döngü içinde bildirmeyi kolaylaştırır.

```go
sum := 0
for i := 0; i < 10; i++ {
    sum += i
}
```

Bir `array`, `slice`, `string` veya `map` üzerinde döngü yapıyorsanız veya bir `channel`'dan okuyorsanız, bir `range` yan tümcesi döngüyü yönetebilir.

```go
sum := 0
for _, value := range array {
    sum += value
}
```

Boş tanımlayıcının daha sonraki bir bölümde açıklandığı gibi birçok kullanımı vardır.

String'lerde, `range` sizin için daha fazla iş yapar ve UTF-8'i ayrıştırarak tek tek Unicode kod noktalarını ayırır. Hatalı kodlamalar bir bayt tüketir ve yedek `rune` `U+FFFD`'yi üretir. (İlişkili yerleşik türle birlikte `rune` adı, tek bir Unicode kod noktası için Go terminolojisidir. Ayrıntılar için [dil belirtimi](https://go.dev/ref/spec#Rune\_literals)ne bakın.) Döngü;

```go
for pos, char := range "日本\x80語" { // \x80 geçerli olmayan bir UTF-8 encoding
    fmt.Printf("%#U karakteri %d bayt posizyonunda başlıyor\n", char, pos)
}
```

Bu kodun çıktısı aşağıdaki gibi olacaktır.

```
U+65E5 '日' karakteri 0 bayt posizyonunda başlıyor
U+672C '本' karakteri 3 bayt posizyonunda başlıyor
U+FFFD '�' karakteri 6 bayt posizyonunda başlıyor
U+8A9E '語' karakteri 7 bayt posizyonunda başlıyor
```

Son olarak, Go virgül operatörüne sahip değildir ve `++` ile `--` karşılaştırma ifadeleri değillerdir.  Bu nedenle, bir `for` içinde birden çok değişken çalıştırmak istiyorsanız, paralel atama kullanmalısınız _(bu `++` ve `--`'yi engellese de)_.

```go
// a dizisini ters çevirir
for i, j := 0, len(a)-1; i < j; i, j = i+1, j-1 {
    a[i], a[j] = a[j], a[i]
}
```

### Switch

Go'daki `switch` C'dekinden daha geneldir. Karşılaştırılan değer _integer_ veya _constant_ olması gerekmez, `case`'ler bir eşleşme bulunana kadar yukarıdan aşağıya doğru değerlendirilir ve eşleşme sağlandığında `true` olarak değerlendirilir. Bu nedenle bir `if`, `else if` veya `if else` zincirini `switch` ile yazmak mümkündür ve bazı yerlerde bu şekilde kullanılması daha uygun olabilir.

```go
func unhex(c byte) byte {
    switch {
    case '0' <= c && c <= '9':
        return c - '0'
    case 'a' <= c && c <= 'f':
        return c - 'a' + 10
    case 'A' <= c && c <= 'F':
        return c - 'A' + 10
    }
    return 0
}
```

Otomatik geçiş _(fall through)_ yoktur, ancak `case`'ler virgülle ayrılmış liste şeklinde sunulabilir.

```go
func shouldEscape(c byte) bool {
    switch c {
    case ' ', '?', '&', '=', '#', '+', '%':
        return true
    }
    return false
}
```

Go'da diğer C-benzeri diller kadar yaygın olmasalar da, bir `switch`'i erken sonlandırmak için `break` deyimleri kullanılabilir. Ancak bazen, `switch'`ten değil, çevreleyen bir döngüden çıkmak gerekir ve Go'da bu, döngüye bir etiket koyarak ve bu etiketi "kırarak" gerçekleştirilebilir. Bu örnek her iki kullanımı da göstermektedir.

```go
Loop: //etiket ismi verdik
    for n := 0; n < len(src); n += size {
        switch {
        case src[n] < sizeOne:
            if validateOnly {
                break
            }
            size = 1
            update(src[n])

        case src[n] < sizeTwo:
            if n+1 >= len(src) {
                err = errShortInput
                break Loop //hangi etiketi break edeceğimizi belirttik
            }
            if validateOnly {
                break
            }
            size = 2
            update(src[n] + src[n+1]<<shift)
        }
    }
```

Elbette, `continue` ifadesi isteğe bağlı bir etiketi de kabul eder, ancak yalnızca döngüler için geçerlidir.

Bu bölümü kapatmak için, iki `switch` ifadesi kullanan bayt dilimleri için bir karşılaştırma yordamı:

```go
// Compare, iki bayt dilimini karşılaştıran bir tamsayı döndürür,
// lexicographically (sözbilimsel olarak).
// Sonuç if a == b, -1 if a < b, and +1 if a > b olursa 0 olacaktır
func Compare(a, b []byte) int {
    for i := 0; i < len(a) && i < len(b); i++ {
        switch {
        case a[i] > b[i]:
            return 1
        case a[i] < b[i]:
            return -1
        }
    }
    switch {
    case len(a) > len(b):
        return 1
    case len(a) < len(b):
        return -1
    }
    return 0
}
```

### Type Switch

Bir `interface` değişkeninin dinamik türünü keşfetmek için `switch` kullanılabilir. Böyle bir `type switch`'in parantezi içerisinde değişkenin tipi alınır ve devamındaki `case`'ler ile karşılaştırılır.&#x20;

```go
var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
default:
    fmt.Printf("bilinmeyen tip %T\n", t)     // %T ile t'nin tipini yazdırabiliriz
case bool:
    fmt.Printf("boolean %t\n", t)             // t'nin tipi bool
case int:
    fmt.Printf("integer %d\n", t)             // t'nin tipi int
case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t'nin tipi *bool
case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t'nin tipi *int
}
```

## Fonksiyonlar

### Çoklu Döndürülen Değerler

Go'nun sıra dışı özelliklerinden biri, fonksiyonların ve metodların birden çok değer döndürebilmesidir. Bu form, C programlarındaki birkaç beceriksiz deyimi geliştirmek için kullanılabilir.

C'de, bir yazma hatası, geçici bir konumda gizlenen hata koduyla negatif bir sayım _(sayısal olarak hata döndürme)_ ile bildirilir. Go'da `Write` bir sayı ve bir hata döndürebilir: "Evet, bazı baytlar yazdınız ama hepsini değil çünkü cihazı doldurdunuz". `os` paketindeki dosyalar üzerindeki `Write` metodunun imzası şudur:

```go
func (file *File) Write(b []byte) (n int, err error)
```

ve yukarıdaki fonksiyonun dökümantasyonunda denildiği gibi, `n` yazılan bayt sayısını döndürür ve `err` ise `n != len(b)` olması durumunda `nil` olmayan bir `error` döndürür. Bu yaygın olarak kullanılan bir yöntemdir. Detaylar için hata yakalamaya _(error handling)_ bakabilirsiniz.

Benzer bir yaklaşım, bir referans parametresini simüle etmek için bir pointer'ı (işaretçi) bir dönüş değerine iletme ihtiyacını ortadan kaldırır. İşte bir bayt dilimindeki _(slice)_ bir konumdan bir sayıyı almak, sayıyı ve bir sonraki konumu döndürmek için basit bir fonksiyon.

```go
func nextInt(b []byte, i int) (int, int) {
    for ; i < len(b) && !isDigit(b[i]); i++ {
    }
    x := 0
    for ; i < len(b) && isDigit(b[i]); i++ {
        x = x*10 + int(b[i]) - '0'
    }
    return x, i
}
```

Bunu, girdi olan `b` slice'ındaki sayıları taramak (iterate) için kullanabilirsiniz, şöyle:

```go
    for i := 0; i < len(b); {
        x, i = nextInt(b, i)
        fmt.Println(x)
    }
```

### İsimli Sonuç Parametreleri

Bir Go fonksiyonunun dönüş _(return)_ veya diğer bir tabir ile sonuç _(result)_ "parametreleri", tıpkı gelen parametrelere verildiği gibi, adlar verilebilir ve düzenli değişkenler olarak kullanılabilir. Adlandırıldıklarında, fonksiyon başladığında türleri için sıfır değerlerine başlatılırlar; fonksiyon bağımsız değişken içermeyen bir dönüş ifadesi yürütürse, sonuç parametrelerinin geçerli değerleri döndürülen değerler olarak kullanılır.

Return isimleri zorun değillerdir ve kodlarınızı daha basit ve anlaşılır kılarlar. `nextInt`'in sonuçlarını _(return'ünü)_ adlandırırsak, hangi `int`'in döndürüldüğü açık hale gelir.

```go
func nextInt(b []byte, pos int) (value, nextPos int) {
```

Adlandırılmış sonuçlar başlatıldığından ve süslenmemiş bir dönüşe bağlı olduğundan _(yani `return` teriminin yanına `return` edilecek şeylerin yazılmadığı durum)_, hem basitleştirebilir hem de netleştirebilirler. İşte onları iyi kullanan bir `io.ReadFull` sürümü:

```go
func ReadFull(r Reader, buf []byte) (n int, err error) {
    for len(buf) > 0 && err == nil {
        var nr int
        nr, err = r.Read(buf)
        n += nr
        buf = buf[nr:]
    }
    return
}
```

### Defer

Go'daki `defer` ifadesi, bir fonksiyon çağrısını ertelemeye yarar ve ertelenen işlem bulunduğu kod bloğu tamamlandığında gerçekleştirilir. Bu işlem genelde bir işlem sonucu yapılan atamaların serbest bırakılması _(örneğin `Close` ve `cancel` gibi fonksiyonlar)_ için kullanılan, alışılmadık fakat etkili bir yöntemdir. Kurallı örnekler, bir mutex'in kilidini _(`mutex.Unlock()` gibi)_ açmak veya bir dosyayı kapatmaktır _(`f.Close()` gibi)_.

```go
// Contents fonksiyonu, dosyanın içeriğini string olarak çıkartan bir fonksiyondur.
func Contents(filename string) (string, error) {
    f, err := os.Open(filename)
    if err != nil {
        return "", err
    }
    defer f.Close()  // f.Close fonksiyonu Contents fonksiyonu tamamlanmadan önce çalışacaktır.

    var result []byte
    buf := make([]byte, 100)
    for {
        n, err := f.Read(buf[0:])
        result = append(result, buf[0:n]...) // result'un sonuna ekliyor.
        if err != nil {
            if err == io.EOF {
                break
            }
            return "", err  // Eğer fonksiyon burada return olursa f burada kapatılır.
        }
    }
    return string(result), nil // Eğer fonksiyon burada return olursa f burada kapatılır.
}
```

`Close` gibi bir fonksiyona yapılan çağrıyı ertelemenin iki avantajı vardır. İlk olarak, dosyayı kapatmayı asla unutmayacağınızı garanti eder, daha sonra fonksiyonu yeni bir dönüş yolu eklemek için düzenlerseniz yapmanız kolay bir hatadır. İkincisi, kapanışı dosya açmaya yakın bir yere koymak, fonksiyonun sonuna yerleştirmekten çok daha net ve basittir.

Ertelenen fonksiyonun argümanları _(fonksiyon bir yöntemse alıcıyı (getter) içerir)_, çağrı yürütüldüğünde değil, erteleme yürütüldüğünde değerlendirilir. Bu, fonksiyon yürütülürken değişkenlerin değerlerinin değişmesiyle ilgili endişelerden kaçınmanın yanı sıra, tek bir ertelenmiş çağrı sitesinin birden çok fonksiyon yürütmesini erteleyebileceği anlamına gelir. İşte saçma bir örnek:

```go
for i := 0; i < 5; i++ {
    defer fmt.Printf("%d ", i)
}
```

Ertelenen fonksiyonlar LIFO _(son giren - ilk çıkar)_ sırasına göre yürütülür, bu nedenle bu kod, fonksiyon döndüğünde `4 3 2 1 0`'ın yazdırılmasına neden olur. Daha makul bir örnek, program aracılığıyla fonksiyonun yürütülmesini izlemenin basit bir yoludur. Bunun gibi birkaç basit izleme _(tracing)_ rutini yazabiliriz:

```go
func trace(s string)   { fmt.Println("izleniyor:", s) }
func untrace(s string) { fmt.Println("bırakılıyor:", s) }

// Onları bu şekilde kullan:
func a() {
    trace("a")
    defer untrace("a")
    // birşeyler yap....
}
```

Ertelenen fonksiyonlara ilişkin argümanların, erteleme yürütüldüğünde değerlendirildiği gerçeğinden yararlanarak daha iyisini yapabiliriz. İzleme rutini, izlemeyi kaldırma rutininin argümanını ayarlayabilir. İşte örnek:

```go
func trace(s string) string {
    fmt.Println("izleniyor:", s)
    return s
}

func un(s string) {
    fmt.Println("bırakılıyor:", s)
}

func a() {
    defer un(trace("a"))
    fmt.Println("a'da")
}

func b() {
    defer un(trace("b"))
    fmt.Println("b'de")
    a()
}

func main() {
    b()
}
```

Çıktısı şu sonucu verir:

```
izleniyor: b
b'de
izleniyor: a
a'da
bırakılıyor: a
bırakılıyor: b
```

Diğer dillerden blok düzeyinde _(block-level)_ kaynak yönetimine alışmış programcılar için erteleme tuhaf görünebilir. Ancak ertelemenin kullanıldığı en güçlü uygulama alanı blok-tabanlı değil, fonksiyon tabanlıdır. `panic` _(panik)_ ve `recover` _(iyileştirme)_ bölümünde, olasılıklarının başka bir örneğini göreceğiz.

## Veri (Data)

### &#x20;`new` ile Tahsis _(Allocation) Etme_

{% hint style="info" %}
_Bu bölümde tabir olarak "tahsis etmek", "ayırmak" çevirileri "allocation" için kullanılmıştır. Özetle hafıza üzerinde bir alan ayrılması anlamına gelir._
{% endhint %}

Go, yerleşik fonksiyonlar `new` ve `make` olmak üzere iki tahsis ilkesine sahiptir. Farklı şeyler yaparlar ve farklı türlere uygulanırlar, bu da kafa karıştırıcı olabilir, ancak kurallar basittir. Önce `new`'den bahsedelim. Bellek tahsis eden yerleşik bir fonksiyondur, ancak diğer bazı dillerdeki adlarından farklı olarak belleği başlatmaz, yalnızca sıfırlar _(yani yazar atama işlemi yapmadığını söylüyor)_. Yani, `new(T)`, `T` türünde yeni bir öğe için sıfırlanmış depolama tahsis eder ve adresini, `*T` türünde bir değer olarak döndürür. Go terminolojisinde, `T` türünde yeni tahsis edilen sıfır değerine bir işaretçi _(pointer)_ döndürür. `new` tarafından döndürülen bellek sıfırlandığından, veri yapılarınızı tasarlarken her türün sıfır değerinin daha fazla başlatma _(initializing)_ olmadan kullanılabileceği şekilde düzenlemeniz yararlı olur. Bu, veri yapısını `new` ile yeni bir tane oluşturabileceği ve hemen çalışmaya başlayabileceği anlamına gelir. Örneğin, `bytes.Buffer` dökümanı, "`Buffer`'ın sıfır değeri, kullanıma hazır bir `buffer`'dır." diye belirtir. Benzer şekilde, `sync.Mutex`'in açık bir kurucusu (constructor) veya `Init` metodu yoktur. Bunun yerine, bir `sync.Mutex` için sıfır değeri, kilidi açılmış bir `mutex` `(unlocked mutex)` olarak tanımlanır.

Sıfır-değer-kullanışlıdır _(zero-value-is-useful)_ özelliği geçişli olarak çalışır. Şimdi bir tip belirtimini düşünelim.

```go
type SyncedBuffer struct {
    lock    sync.Mutex
    buffer  bytes.Buffer
}
```

`SyncedBuffer` tipindeki değerler de tahsis veya sadece belirtim üzerine hemen kullanıma hazırdır. Sonraki snippet'te, hem `p` hem de `v`, daha fazla düzenleme olmadan doğru şekilde çalışacaktır.

```go
p := new(SyncedBuffer)  // type *SyncedBuffer
var v SyncedBuffer      // type  SyncedBuffer
```

### Kurucu ve Bileşik Değişmezler (Constructors and composite literals) <a href="#composite_literals" id="composite_literals"></a>

Bazen sıfır değeri yeterince iyi değildir ve `os` paketinden türetilen bu örnekte olduğu gibi bir başlatıcı _(initializer)_ kurucu gereklidir.

```go
func NewFile(fd int, name string) *File {
    if fd < 0 {
        return nil
    }
    f := new(File)
    f.fd = fd
    f.name = name
    f.dirinfo = nil
    f.nepipe = 0
    return f
}
```

Bu şekilde kullanmak, her tanımlama yapıldığında uzun olacağı için, daha kısa bir yol olan aşağıdaki yöntemi deneyebiliriz:

```go
func NewFile(fd int, name string) *File {
    if fd < 0 {
        return nil
    }
    f := File{fd, name, nil, 0}
    return &f
}
```

C'den farklı olarak, yerel bir değişkenin adresini döndürmenin tamamen uygun olduğunu unutmayın; değişkenle ilişkili depolama, fonksiyon döndükten sonra varlığını sürdürür. Aslında, bir bileşik değişmezin adresini almak, her değerlendirildiğinde yeni bir örnek tahsis eder, bunun için son iki satırı birleştirmemiz daha mantıklı olur.

```go
return &File{fd, name, nil, 0}
```

Bileşik değişmezin alanları sırayla düzenlenir ve hepsinin mevcut olması gerekir. Bununla birlikte, öğeleri açıkça `anahtar:değer` _(`key:value`)_ çiftleri olarak etiketleyerek, başlatıcılar, eksik olan alanlara otomatik olarak sıfır değerlerini verir. Aşağıdaki gibi de olabilirdi:

```go
return &File{fd: fd, name: name}
```

Sınırlayıcı bir durum olarak, bir bileşik değişmez hiç alan içermiyorsa, tür için sıfır değeri oluşturur. Yani `new(File)` ve `&File{}` ifadeleri eşdeğerdir.

Diziler _(arrays)_, dilimler _(slices)_ ve map'ler için, alan etiketleri uygun şekilde indeks veya map anahtarları _(key)_ olacak şekilde bileşik değişmez değerler de oluşturulabilir. Bu örnekte, başlatmalar _(init)_, farklı oldukları sürece `Enone`, `Eio` ve `Einval` değerlerinden bağımsız olarak çalışır.

```go
a := [...]string   {Enone: "hata yok", Eio: "Eio", Einval: "geçersiz argüman"}
s := []string      {Enone: "hata yok", Eio: "Eio", Einval: "geçersiz argüman"}
m := map[int]string{Enone: "hata yok", Eio: "Eio", Einval: "geçersiz argüman"}
```

### make ile Tahsis Etme



