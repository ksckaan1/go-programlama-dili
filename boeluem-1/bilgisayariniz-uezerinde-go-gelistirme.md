# VSCode Go Eklentisi Yükleme

Go'yu indirdiğimize göre bize Go kodlarımızı yazacağımız bir Tümleşik Geliştirme Ortamı (IDE) lazım. IDE’ler kodlarımızı yazarken kodların doğruluğunu kontrol eder ve kod yazarken önerilerde bulunur. Bu da kod yazarken işimizi kolaylaştırır.

Çoğu programlama dili ile geliştirme yaparken kullanılan ve Go yazanların da popüler olarak kullandığı **Visual Studio Code** programınu kullanabilirsiniz.

Buradan İndirebilirsiniz

[https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)

GNU/Linux OS kullananlara yine kullandıkları dağıtımın uygulama deposundan indirmeleri tavsiye edilir.

Visual Studio Code’dan ileriki zamanlarda **vscode** olarak bahsedilecek.

Go eklentisinin düzgün bir şekilde kurulabilmesi için bilgisayarımızda **git** komut-satırı uygulaması bulunması gerekir. Çünkü eklentinin yüklenmesinden sonra Go eklentisi VSCode için 15 civarı aracı otomatik indirecek. Git’in yüklü olup olmadığını öğrenmek için komut satırına aşağıdakileri yazın:

Eğer versiyon numarasını gördüyseniz yüklü demektir. Eğer yüklü değilse veya git’i güncellemek istiyorsanız ki, mutlaka öneririm, aşağıda nasıl yükleneceğini görebilirsiniz.

`git --version`

### Windows MacOS

Windows için: [Buradan İndirebilirsiniz](https://git-scm.com/download/win)

MacOS: [Buradan İndirebilirsiniz.](https://git-scm.com/download/mac)

### **GNU/Linux İşletim Sistemleri**

#### **Debian/Ubuntu**

`sudo apt-get install git`

#### **Fedora**

`dnf install git`

#### **Arch Linux**

`sudo pacman -S git`

#### **Gentoo**

`emerge --ask --verbose dev-vcs/git`

#### **openSUSE**

`zypper install git`

#### **Mageia**

`urpmi git`

Git kurulumunu da yaptığımıza göre VSCode için Go eklentisini kurabiliriz.

![VS Code Go Eklentisi](../.gitbook/assets/DeepinScreenshot\_select-area\_20191006213837.webp)

Vscode’un sol tarafından **Extension** (Eklentiler) sekmesine geçiyoruz. Arama kutusuna **go** yazıyoruz. Resimde de seçili olan Go eklentisini yeşil **Install (Yükle)** butonuna basarak yüklüyoruz. Yeniden başlatma isterse başlatmayı unutmayın.

Daha sonra **main.go** adında bir dosya oluşturup VSCode ile açalım. main.go dosyasının içerisine rastgele birşeyler yazdığımızda VSCode sağ alt tarafta bize uyarı verecektir.

![VS Code Go Uyarısı](../.gitbook/assets/golang-plugins-all.webp)

**Install All** diyerek Go geliştirmemize yazrdımcı olacak araçların kurulumunu başlatalım.

Kurulum bize 15 civarı araç kuracak. Başarı ile kurulan araçların yanında **SUCCEED** ibaresi yer alır.

Tüm araçlarımız başarıyla kurulunca artık VSCode üzerinden Go geliştirmeye hazır olacaksınız.

##
