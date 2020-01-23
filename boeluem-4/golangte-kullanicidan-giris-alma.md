# Golang'te Kullanıcıdan Giriş Alma

Golang’te diğer programlama dillerinde de olduğu gibi kullanıcıdan değer girişi alınabilir. Böylece programımızı interaktif hale getirmiş oluruz.

  
**Scan\(\) Fonksiyonu**  
Bu fonksiyon boşluğa kadar olan kelimeyi kaydeder. Yeni satır boşluk olarak sayılır. Kullanımını görelim.

```go
var yazi string
fmt.Scan(&yazi) //yazi değişkenine değer girilmesini istedik.
fmt.Println(“\n”+yazi)
```

Yukarıda yazdığımız kodları inceleyecek olursak, belleğe yazi isimli string türünde bir değişken kaydettik. Kullanıcının girişte bulunabilmesi için **Scan\(\)** fonksiyonunu kullandık. Bu fonksiyonun içerisine **&yazi** yazdık. Bu sayede kullanıcının girdiği değer **yazi** değişkeninin içerisine kaydedilebilecek. Daha sonra **yazi** değişkenini ekrana bastırdık ve bizim yazdığımız değer görüntülendi. Scan fonksiyonunda dikkat edilmesi gereken nokta kullanıcı istediği kadar kelime girse bile programın ilk kelimeyi değer olarak alacağıdır. **Scan\(\)** fonksiyonu boş giriş kabul etmez.

**Scanf\(\) Fonksiyonu**  
**Scanf\(\)** fonksiyonu **Printf\(\)** fonksiyonu gibi format içerir. Bu fonksiyon ile kullanıcının girişini bölüp birkaç değişkene kaydedebiliriz. Hemen kullanımını görelim.

```go
var kelime1, kelime2 string
fmt.Scanf(“%s %s”,&kelime1,&kelime2)
fmt.Println(kelime1)
fmt.Println(kelime2)
```

Yukarıda yazdığımız kodları inceleyecek olursak, **kelime1** ve **kelime2** adında **string** türünde değişkenler belirledik. **Scanf\(\)** fonksiyonu ile **Printf\(\)**’den benzer olarak, değişkenlerin yerleştirileceği yerleri değil de, bu sefer değişkenlerin alınacağı yerleri belirtiyoruz. **%s %s** arasındaki **boşluk** sayesinden kullanıcı boşluk bırakınca girdiyi **2** değere bölebileceğiz. Hemen yanında ise içine atanacak değişkenlerimizi belirtiyoruz. Böylelikle kullanıcı giriş bölümünden Go Dili yazdığında **Go**’yu **kelime1**’in içine **Dili** de **kelime2** içine yerleştirecek. **Scanf\(\)**, boş giriş kabul eder.

**Reader ile Satır Olarak Değer Alma**  
Aşağıdaki yöntem ile bir satır yazıyı giriş olarak alabilirsiniz.

```go
giris := bufio.NewReader( os.Stdin)
yazi, _ := giris.ReadString('\n')
```

{% hint style="info" %}
**Scan** komutu ile kelime alamadığınızda **Reader** ile deneyebilirsiniz.
{% endhint %}

