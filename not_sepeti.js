const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStoragedanOku);



function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;
    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {

        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
        //toggle o elemanı sınıf listesine yoksa ekler varsa siler bu işe yarar.
    }

    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {

        if (confirm('Are you sure?')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);
            tiklanilanEleman.parentElement.addEventListener('transationed', function() {
                tiklanilanEleman.parentElement.remove();
            });
        }


    }
}

function gorevEkle(e) //buradaki e eventi temsil eder 
{
    e.preventDefault();
    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert("Boş görev tanımı gerçekleştirilemez ")
    }



}

function localStorageKaydet(yeniGorev) {
    let gorevler = localStorageArrayDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStoragedanOku() {
    let gorevler = localStorageArrayDonustur();

    gorevler.forEach(function(gorev) {
        gorevItemOlustur(gorev);

    });
}

function gorevItemOlustur(gorev) {
    //div oluşturma

    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');


    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    //div'e ekledik
    gorevDiv.appendChild(gorevLi);

    //tamamlandı butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
    gorevDiv.appendChild(gorevTamamBtn);



    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    gorevDiv.appendChild(gorevSilBtn);
    //local storage kaydet



    //ul'ye oluşturduğumuz div'i ekleyelim
    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {

    let gorevler = localStorageArrayDonustur();


    //splice ile item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex, 1);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));

}

function localStorageArrayDonustur() {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    return gorevler;

}