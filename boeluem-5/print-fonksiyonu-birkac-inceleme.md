# Print Fonksiyonu Birkaç İnceleme

Print fonksiyonu Go dilinde komut satırı üzerinde yazdırma işlemi yapmak için kullanılır. Print fonksiyonunun en çok kullanılan 3 çeşidine bakalım.

**Print\(\) Fonksiyonu**  
Bu fonksiyonun içine parametreler girerek ekrana yazdırma işlemi yapabiliriz.

```go
fmt.Print(“Merhaba Dünya!”)
```

Çıktımız şu şekilde olacaktır:

> Merhaba Dünya

**Println\(\) Fonksiyonu**  
Bu fonksiyon ile içine parametre girerek ekrana yazdırma işlemi yapabiliriz. Yazdırma işlemi yaptıktan sonra bir alt satıra geçer.

```go
fmt.Println(“satır1”)
fmt.Println(“satır2”)
```

Çıktımız şu şekilde olacaktır;

> satır1  
> satır2

**Printf\(\) Fonksiyonu**  
Gelelim işimizi görecek olan Printf\(\) fonksiyonuna. Bu fonksiyon sayesinde metinsel bölümlerin arasına değişken yerleştirebiliriz.

```go
dil:=”Go”
yıl:=2007
fmt.Printf(“%s dili %d yılından beri geliştiriliyor.”,dil,yıl)
```

Çıktımız şu şekilde olacaktır;

> Go dili 2007 yılından beri geliştiriliyor.

