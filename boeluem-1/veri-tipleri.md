# Veri Tipleri

**Integer Türler**

Öncelikle tüm integer türleri bir görelim;

int, int8, int16, int32, int64

uint, uint8, uint16, uint32, uint64, uintptr

Bu veri tipleri içerisinde sayısal değerleri depolayabiliriz. Fakat şunu da unutmamalıyız. Her sayısal veri tipinin depolayabildiği maksimum bit vardır. Örnek olarak uint8 veri tipinin maksimum uzunluğu 8 bit’tir. Bitler 0 ve 1 sayılarından oluşur. 8 bit demek 8 haneli 1 ve 0 sayısı demektir. Int8 maksimum alabileceği sayı derken 11111111 (8 tane 1), yani onluk sistemde 255 sayısına denk gelir. int 8 ise pozitif olarak +127, negatif olarak -128 maksimum değerinin alabilir. (127+128=255). int16 +32767 ve -32768 maksimum değerlerini alır. Int32 +2147483647 ve -2147483648 maksimum değerlerini alır. Int64 +9223372036854775807 ve -9223372036854775808 maksimum değerini alır.

U harfi ile başlayan sayı veri tiplerinde ise sayının değeri pozitif veya negatif işarette değildir. Sadece bir sayısal değerdir. U’nun anlamı unsigned yani işaretsizdir. Uint8 0-255 arası, uint16 0-65535, uint32 0-42967295 arası, uint64 0-18446744073709551615 arası değerler alabilir. Uintptr ise yazdığınız sayıya göre alanı belirlenir.

Integer sayısal veri tipleri içerisinden bahsedebileceğimiz son tipler ise int ve uint. Int ve uint veri tipleri kullanmış olduğumuz işletim sistemi 32bit ise 32bit değer alırlar, 64bit ise 64bit değer alırlar. Sayısal bir değer atanacağı zaman en çok kullanılan veri tipleridir. Genellikle int daha çok kullanılır. Eğer çok meşakkatli bir program yazmayacaksanız int kullanmanız önerilir.

**Byte Veri Tipi:** uint8 ile aynıdır.

**Rune:** int32 ile aynıdır. Unicode karakter kodlarını ifade eder.

**Float Türler**

Float türleri integer türlerden farklı olarak küsüratlı sayıları tutar. Örnek: 3.14

**Lütfen Dikkat!**

Küsüratlı sayılar İngiliz-Amerikan sayı sistemine göre nokta koyarak ifade edilir. Türk sistemindeki gibi virgül (3,14) ile ifade edilmez.

**float32:** 32bitlik değer alabilir.

**float64:** 64 değer alabilir.

**Complex Türler**

Complex türleri içerisinde gerçel küsüratlı (float) ve sanal sayılar barındırabilir. Türkçe’de karmaşık sayılar diye adlandırılır.

**complex64:** Gerçel float32 ve sanal sayı değeri barındırır.

**complex128:** Gerçel float64 ve sanal sayı değeri barındırır.

Sayısal türler bu şekildedir.

**BOOLEAN VERİ TİPİ**

Boolean yani mantıksal veri tipi bir durumun var olması halinde olumlu (true) değer, var olmaması halinde olumsuz (false) değer alan veri tipidir.

**STRING VERİ TİPİ**

String yani dizgi veri tipi içerisinde metinsel ifadeler barındırır. Örnek olarak “Golang çok güzel ama ingilicce”. String veri tipi değeri çift tırnak ( “Değer” ) içine yazılır. Diğer dillerdeki gibi tek tırnak ( ‘Değer’ ) insiyatifi yoktur. Tek tırnakla kullanım başka bir amaç içindir. İleride onu da göstereceğim.

**Özet olarak Veri Tipleri**

Veri tipleri atanacak değerlerimizi RAM üzerinde depolamak için kullandığımız araçlardır. Tam sayı değerler için Integer veri tiplerini, ondalık sayılar için Float veri tiplerini, mantıksal değerler için Boolean veri tipini, metinsel değerler için String veri tipini kullanırız. Karmaşık sayı değerleri için ise Complex veri tipini kullanırız.

”Türkiye” = String Tipi

1881 = Integer Tipi

10,5 = Float Tipi

True = Boolean Tipi

2+3i = Complex Tipi

**Veri Tiplerinin Varsayılan Değerleri**

Veri tipleri içerisine değer atanmadan oluşturulduğu zaman varsayılan bir değer alır.

Sayısal Tipler için 0,

Boolean Tipi için false,

String Tipi için “” (Boş dizgi) değeri alır.
