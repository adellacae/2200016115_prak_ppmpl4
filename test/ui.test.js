const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('D:/selenium_ui_test/login.html'); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });

    
    it('should display an error message if login fails', async function() {
        // Input username dan password yang salah
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        
        // Klik tombol login
        await driver.findElement(By.id('loginButton')).click();
    
        // Tunggu hingga elemen errorMessage muncul
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000); // Tunggu hingga 5 detik
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });


it('should input username and password using CSS Selector', async function() {
    // Menggunakan CSS Selector untuk menemukan elemen username dan password
    await driver.findElement(By.css('#username')).clear();
    await driver.findElement(By.css('#username')).sendKeys('testuser');

    await driver.findElement(By.css('#password')).clear();
    await driver.findElement(By.css('#password')).sendKeys('password123');

    // Klik tombol login
    await driver.findElement(By.css('#loginButton')).click();
});

it('should input username and password using XPath', async function() {
    // Menggunakan XPath untuk menemukan elemen username dan password
    await driver.findElement(By.xpath('//*[@id="username"]')).clear();
    await driver.findElement(By.xpath('//*[@id="username"]')).sendKeys('testuser');

    await driver.findElement(By.xpath('//*[@id="password"]')).clear();
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

    // Klik tombol login menggunakan XPath
    await driver.findElement(By.xpath('//*[@id="loginButton"]')).click();
});

it('should display the login button', async function() {
    const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
    expect(isDisplayed).to.be.true;
});


it('should display the username input field', async function() {
    const isDisplayed = await driver.findElement(By.id('username')).isDisplayed();
    expect(isDisplayed).to.be.true;
});


it('should display the password input field', async function() {
    const isDisplayed = await driver.findElement(By.id('password')).isDisplayed();
    expect(isDisplayed).to.be.true;
});
});
