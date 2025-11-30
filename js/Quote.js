// ===============================
//  DATA: Build Tiers & Pricing
// ===============================

const pricing = {
    starter: {
        base: 1000,
        cpu: { none: 0, low: 0, medium: 0, high: 0 },
        gpu: { none: 0, low: 0, medium: 0, high: 0 },
        ram: { none: 0, low: 0, medium: 0, high: 0 },
        ssd: { none: 0, low: 0, medium: 0, high: 0 }
    },
    gaming: {
        base: 2500,
        cpu: { none: 0, low: 0, medium: 0, high: 0 },
        gpu: { none: 0, low: 0, medium: 0, high: 0 },
        ram: { none: 0, low: 0, medium: 0, high: 0 },
        ssd: { none: 0, low: 0, medium: 0, high: 0 }
    },
    workstation: {
        base: 7000,
        cpu: { none: 0, low: 1000, medium: 3500, high: 10500 },
        gpu: { none: 0, low: 1000, medium: 8000, high: 39000},
        ram: { none: 0, low: 300, medium: 700, high: 11000 },
        ssd: { none: 0, low: 100, medium: 300, high: 900 }
    }
};

// ===============================
//  Populate Dropdowns Dynamically
// ===============================

// Dropdown references
const systemTier = document.getElementById("systemTier");
const cpuUpgrade = document.getElementById("cpuUpgrade");
const gpuUpgrade = document.getElementById("gpuUpgrade");
const ramUpgrade = document.getElementById("ramUpgrade");
const ssdUpgrade = document.getElementById("ssdUpgrade");

// Populate System Tier Dropdown
Object.keys(pricing).forEach(tier => {
    systemTier.innerHTML += `<option value="${tier}">${tier.charAt(0).toUpperCase() + tier.slice(1)}</option>`;
});

// Reusable function for upgrades
function populateUpgradeDropdown(dropdown, options) {
    dropdown.innerHTML = "";
    Object.keys(options).forEach(level => {
        dropdown.innerHTML += `<option value="${level}">${level.charAt(0).toUpperCase() + level.slice(1)}</option>`;
    });
}

// Populate all upgrade dropdowns on page load
populateUpgradeDropdown(cpuUpgrade, pricing.starter.cpu);
populateUpgradeDropdown(gpuUpgrade, pricing.starter.gpu);
populateUpgradeDropdown(ramUpgrade, pricing.starter.ram);
populateUpgradeDropdown(ssdUpgrade, pricing.starter.ssd);

// ===============================
//  Form Validation + Calculation
// ===============================

const quoteForm = document.getElementById("quoteForm");
const quoteResult = document.getElementById("quoteResult");
const quoteOutput = document.getElementById("quoteOutput");

quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!quoteForm.checkValidity()) {
        quoteResult.classList.add("d-none");
        quoteForm.classList.add("was-validated");
        return;
    }

    const tier = systemTier.value;
    const tierPrices = pricing[tier];

    const cpu = cpuUpgrade.value;
    const gpu = gpuUpgrade.value;
    const ram = ramUpgrade.value;
    const ssd = ssdUpgrade.value;

    const total =
        tierPrices.base +
        tierPrices.cpu[cpu] +
        tierPrices.gpu[gpu] +
        tierPrices.ram[ram] +
        tierPrices.ssd[ssd];

    quoteOutput.innerHTML = `
        <strong>System Tier:</strong> ${tier}<br>
        <strong>CPU Upgrade:</strong> ${cpu}<br>
        <strong>GPU Upgrade:</strong> ${gpu}<br>
        <strong>RAM Upgrade:</strong> ${ram}<br>
        <strong>SSD Upgrade:</strong> ${ssd}<br><br>

        <strong>Total Price:</strong> $${total}
    `;

    quoteResult.classList.remove("d-none");
});
