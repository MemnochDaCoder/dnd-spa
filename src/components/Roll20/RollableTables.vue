<template>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="accordion accordion-flush" id="gemAndArtAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="gemAndArtHeader">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#gemAndArtCollapse" aria-expanded="false" aria-controls="gemAndArtCollapse">
                            Set Gem and Art Table Names
                        </button>
                    </h2>
                    <div id="gemAndArtCollapse" class="accordion-collapse collapse" aria-labelledby="gemAndArtHeader"
                        data-bs-parent="#gemAndArtAccordion">
                        <div class="accordion-body">
                            <div class="row align-items-start">
                                <div class="col">
                                    <h3>Gem Table Names</h3>
                                    <div class="input-group">
                                        <div class="input-group">
                                            <span for="gemTableName10" class="input-group-text">10gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="gemTableName10">
                                            </div>
                                        </div>
                                        <div class="form-text" id="gemTableName10">Default: 5e-Treasure-10gp-Gemstones</div>
                                        <div class="input-group">
                                            <span for="gemTableName50" class="input-group-text">50gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="gemTableName50">
                                            </div>
                                        </div>
                                        <div class="form-text" id="gemTableName50">Default: 5e-Treasure-50gp-Gemstones</div>
                                        <div class="input-group">
                                            <span for="gemTableName100" class="input-group-text">100gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="gemTableName100">
                                            </div>
                                        </div>
                                        <div class="form-text" id="gemTableName50">Default: 5e-Treasure-100gp-Gemstones
                                        </div>
                                        <div class="input-group">
                                            <span for="gemTableName500" class="input-group-text">500gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="gemTableName500">
                                            </div>
                                        </div>
                                        <div class="form-text" id="gemTableName500">Default: 5e-Treasure-500gp-Gemstones
                                        </div>
                                        <div class="input-group">
                                            <span for="gemTableName1000" class="input-group-text">1000gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="gemTableName1000">
                                            </div>
                                        </div>
                                        <div class="form-text" id="gemTableName1000">Default: 5e-Treasure-1000gp-Gemstones
                                        </div>
                                        <div class="input-group">
                                            <span for="gemTableName1000" class="input-group-text">5000gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="gemTableName5000">
                                            </div>
                                        </div>
                                        <div class="form-text" id="gemTableName5000">Default: 5e-Treasure-5000gp-Gemstones
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <h3>Art Table Names</h3>
                                    <div class="input-group">
                                        <div class="input-group">
                                            <span id="artTableName10" class="input-group-text">25gp</span>
                                            <div>
                                                <input type="text" class="form-control" id="artTableName25">
                                            </div>
                                        </div>
                                        <div class="form-text" id="artTableName50">Default: 5e-Treasure-25gp-Art</div>
                                        <div class="input-group">
                                            <span id="artTableName50" class="input-group-text">250gp</span>
                                            <div><input type="text" class="form-control" id="artTableName250"></div>
                                        </div>
                                        <div class="form-text" id="artTableName250">Default: 5e-Treasure-250gp-Art</div>
                                        <div class="input-group">
                                            <span id="artTableName100" class="input-group-text">750gp</span>
                                            <div><input type="text" class="form-control" id="artTableName750"></div>
                                        </div>
                                        <div class="form-text" id="artTableName750">Default: 5e-Treasure-750gp-Art</div>
                                        <div class="input-group">
                                            <span id="artTableName500" class="input-group-text">2500gp</span>
                                            <div><input type="text" class="form-control" id="artTableName2500"></div>
                                        </div>
                                        <div class="form-text" id="artTableName2500">Default: 5e-Treasure-2500gp-Art</div>
                                        <div class="input-group">
                                            <span id="artTableName1000" class="input-group-text">7500gp</span>
                                            <div><input type="text" class="form-control" id="artTableName7500"></div>
                                        </div>
                                        <div class="form-text" id="artTableName7500">Default: 5e-Treasure-7500gp-Art</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-group" role="group" aria-label="Click for tables">
        <button type="button" class="btn btn-outline-dark" @click="formatGemsAndArt">Gems & Art</button>
        <button type="button" class="btn btn-outline-dark" @click="formatWeapons">All Weapons</button>
        <button type="button" class="btn btn-outline-dark" @click="formatArmor">Armor</button>
        <button type="button" class="btn btn-outline-dark" @click="formatDragonTypes">Dragon Types</button>
        <button type="button" class="btn btn-outline-dark" @click="formatDamageTypes">Damage Types</button>
        <button type="button" class="btn btn-outline-dark" @click="formatWondrousItems">Sublists</button>
        <button type="button" class="btn btn-outline-dark" @click="formatSpellScrolls">Spell Scrolls</button>
        <button type="button" class="btn btn-outline-dark" @click="formatLootTables">Loot Tables</button>
    </div>
    <template v-if="showGemsAndArt">
        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="gemToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Gems</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyGems">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Gem Import Statements</h5>
                            <p class="card-text" id="gemImports" v-for="gem in gemDisplay" :key="gem">
                                {{ gem }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card" style="width: 30rem;">
                    <div class="toast-container">
                        <div id="artToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <strong class="me-auto">Art</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Art import statements have been copied to the clipboard.
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-outline-info" type="button" @click="copyArt">Copy</button>
                    <div class="card-body">
                        <h5 class="card-title">Art Import Statements</h5>
                        <p class="card-text" id="artImports" v-for="art in artDisplay" :key="art">
                            {{ art }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="showAllWeapons">
        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="weaponToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Weapons</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyAllWeapons">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Weapon Import Statements</h5>
                            <p class="card-text" id="weaponImports" v-for="weapon in weaponDisplay" :key="weapon">
                                {{ weapon }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card" style="width: 30rem;">
                    <div class="toast-container">
                        <div id="damageTypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <strong class="me-auto">Damage Types</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Art import statements have been copied to the clipboard.
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-outline-info" type="button" @click="copyAllDamageTypes">Copy</button>
                    <div class="card-body">
                        <h5 class="card-title">Damage Type Import Statements</h5>
                        <p class="card-text" id="damageTypeImports" v-for="d in damageTypeDisplay" :key="d">
                            {{ d }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="showArmor">
        <div class="container text-center"><br />
            <div class="row align-items-start">
                <div class="col">
                    <button class="btn btn-outline-dark" @click="copyArmor('allArmorTables')">Copy All</button>
                </div><br />
            </div>
        </div>
        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="armorToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Armor</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row align-items-start">
                    <div class="col card" style="width: 30rem;">
                        <button class="btn btn-outline-info" type="button" @click="copyArmor('all')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">All Armor Import Statements</h5>
                            <p class="card-text" id="allArmor" v-for="a in allArmorDisplay" :key="a">
                                {{ a }}
                            </p>
                        </div>
                    </div>
                    <div class="col card" style="width: 30rem;">
                        <button class="btn btn-outline-info" type="button" @click="copyArmor('heavy')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Heavy Armor Import Statements</h5>
                            <p class="card-text" id="heavyArmor" v-for="h in heavyArmorDisplay" :key="h">
                                {{ h }}
                            </p>
                        </div>
                    </div>
                    <div class="col card" style="width: 30rem;">
                        <button class="btn btn-outline-info" type="button" @click="copyArmor('heavyMedium')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Heavy/Medium Armor Import Statements</h5>
                            <p class="card-text" id="heavyArmor" v-for="hm in heavyMediumArmorDisplay" :key="hm">
                                {{ hm }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row align-items-start">
                    <div class="col card" style="width: 30rem;">
                        <button class="btn btn-outline-info" type="button" @click="copyArmor('medium')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Medium Armor Import Statements</h5>
                            <p class="card-text" id="mediumArmor" v-for="m in mediumArmorDisplay" :key="m">
                                {{ m }}
                            </p>
                        </div>
                    </div>
                    <div class="col card" style="width: 30rem;">
                        <button class="btn btn-outline-info" type="button" @click="copyArmor('light')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Light Armor Import Statements</h5>
                            <p class="card-text" id="lightArmor" v-for="light in lightArmorDisplay" :key="light">
                                {{ light }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="showDragonTypes">
        <br /><br /><br />
        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col-12">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="dragonTypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Dragon Types</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyDragonTypes">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Dragon Type Import Statements</h5>
                            <p class="card-text" id="dragonTypeImports" v-for="dType in dragonTypeDisplay" :key="dType">
                                {{ dType }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="showDamageTypes">
        <br /><br /><br />
        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col-12">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="damageTypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Damage Types</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyDamageTypes">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Damage Type Import Statements</h5>
                            <p class="card-text" id="dragonTypeImports" v-for="dType in damageTypeDisplay" :key="dType">
                                {{ dType }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="showWondrousItems">
        <br /><br /><br />
        <div class="container text-center">
            <div class="row align-items-start">
                <template v-if="showWondrousItems">
                    <br /><br /><br />
                    <div class="container text-center">
                        <div class="row align-items-start">
                            <div class="col-6">
                                <div class="card" style="width: 30rem;">
                                    <div class="toast-container">
                                        <div id="wondrousTypeToast" class="toast" role="alert" aria-live="assertive"
                                            aria-atomic="true">
                                            <div class="toast-header">
                                                <strong class="me-auto">Damage Types</strong>
                                                <button type="button" class="btn-close" data-bs-dismiss="toast"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="toast-body">
                                                Art import statements have been copied to the clipboard.
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline-info" type="button" @click="copySubLists">Copy</button>
                                    <div class="card-body">
                                        <h5 class="card-title">Sub List Import Statements</h5>
                                        <p class="card-text" id="sublists" v-for="f in wondrousItemsDisplay" :key="f">
                                            {{ f }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card" style="width: 30rem;">
                                    <div class="toast-container">
                                        <div id="trinketTypeToast" class="toast" role="alert" aria-live="assertive"
                                            aria-atomic="true">
                                            <div class="toast-header">
                                                <strong class="me-auto">Trinkets</strong>
                                                <button type="button" class="btn-close" data-bs-dismiss="toast"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="toast-body">
                                                Art import statements have been copied to the clipboard.
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline-info" type="button" @click="copyTrinkets">Copy</button>
                                    <div class="card-body">
                                        <h5 class="card-title">Trinket Import Statements</h5>
                                        <p class="card-text" id="trinketDisplay" v-for="t in trinketDisplay" :key="t">
                                            {{ t }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </template>
    <template v-if="showSpellScrolls">
        <br /><br /><br />
        <div class="container text-center">
            <div class="row align-items-start">
                <div id="allScrollsToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">All Scrolls</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Art import statements have been copied to the clipboard.
                    </div>
                </div>
                <button class="btn btn-outline-dark" @click="copyScrolls('all')" type="button">Copy All</button>
            </div>
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="cantripTypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('cantrip')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Cantrip Import Statements</h5>
                            <p class="card-text" id="cantripTypeImports" v-for="cantrip in scrollDisplay[0]" :key="cantrip">
                                {{ cantrip }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="levelOneToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 1 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lOne')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 1 Scroll Import Statements</h5>
                            <p class="card-text" id="levelOneImports" v-for="scroll in scrollDisplay[1]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="levelTwoScrollToast" class="toast" role="alert" aria-live="assertive"
                                aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 2 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lTwo')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 2 Scroll Import Statements</h5>
                            <p class="card-text" id="levelTwoImports" v-for="scroll in scrollDisplay[2]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="lThreeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 3 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lThree')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 3 Scroll Import Statements</h5>
                            <p class="card-text" id="cantripTypeImports" v-for="scroll in scrollDisplay[3]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="lFourToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 4 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lFour')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 4 Scroll Import Statements</h5>
                            <p class="card-text" id="levelFourImports" v-for="scroll in scrollDisplay[4]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="levelFiveScrollToast" class="toast" role="alert" aria-live="assertive"
                                aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 5 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lFive')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 5 Scroll Import Statements</h5>
                            <p class="card-text" id="levelFiveImports" v-for="scroll in scrollDisplay[5]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="lSixToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 6 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lSix')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 6 Scroll Import Statements</h5>
                            <p class="card-text" id="levelSixImports" v-for="scroll in scrollDisplay[6]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="lSevenToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 7 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lSeven')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 7 Scroll Import Statements</h5>
                            <p class="card-text" id="levelSevenImports" v-for="scroll in scrollDisplay[7]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="lEightToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 8 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lEight')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 8 Scroll Import Statements</h5>
                            <p class="card-text" id="levelEightImports" v-for="scroll in scrollDisplay[8]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="levelNineScrollToast" class="toast" role="alert" aria-live="assertive"
                                aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Level 9 Scrolls</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lNine')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Level 9 Scroll Import Statements</h5>
                            <p class="card-text" id="levelNineImports" v-for="scroll in scrollDisplay[9]" :key="scroll">
                                {{ scroll }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="showLootTables">
        <br /><br /><br />
        <div class="container text-center">
            <div class="row align-items-start">
                <div id="allLootTableToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">All Loot Tables</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Art import statements have been copied to the clipboard.
                    </div>
                </div>
                <button class="btn btn-outline-dark" @click="copyLootTable('all')" type="button">Copy All</button>
            </div>
            <br /><br />
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="indv0-4TypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Loot Table</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('indv0-4')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Individual Loot 0-4 Import Statements</h5>
                            <p class="card-text" id="indv0-4TypeImports" v-for="lt in indvLoot0_4" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="indv5-10Toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Individual Loot 5-10</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyScrolls('lOne')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Individual Loot 5-10 Import Statements</h5>
                            <p class="card-text" id="indv5-10TypeImports" v-for="lt in indvLoot5_10" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="indv11-16TypeToast" class="toast" role="alert" aria-live="assertive"
                                aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Loot Table</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('indv11-16')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Individual Loot 11-16 Import Statements</h5>
                            <p class="card-text" id="indv11-16TypeImports" v-for="lt in indvLoot11_16" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="indv17Toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Individual Loot 17+</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('indv17')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Individual Loot 17+ Import Statements</h5>
                            <p class="card-text" id="indv17TypeImports" v-for="lt in indvLoot17" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="hrd0-4TypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Loot Table</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('hrd0-4')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Hoard Loot 0-4 Import Statements</h5>
                            <p class="card-text" id="hrd0-4TypeImports" v-for="lt in hrdLoot0_4" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="hrd5-10Toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Hoard Loot 5-10</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('hrd5-10')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Hoard Loot 5-10 Import Statements</h5>
                            <p class="card-text" id="hrd5-10TypeImports" v-for="lt in indvLoot5_10" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div class="row align-items-start">
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="hrd11-16TypeToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Loot Table</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('hrd11-16')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Hoard Loot 11-16 Import Statements</h5>
                            <p class="card-text" id="hrd11-16TypeImports" v-for="lt in indvLoot11_16" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="card" style="width: 30rem;">
                        <div class="toast-container">
                            <div id="hrd17Toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">Hoard Loot 17+</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Art import statements have been copied to the clipboard.
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-info" type="button" @click="copyLootTable('hrd17')">Copy</button>
                        <div class="card-body">
                            <h5 class="card-title">Hoard Loot 17+ Import Statements</h5>
                            <p class="card-text" id="hrd17TypeImports" v-for="lt in hrdLoot17" :key="lt">
                                {{ lt }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Toast } from 'bootstrap';
import Constants from '../../constants';
import { toRaw } from 'vue';

export default {
    data() {
        return {
            importItemStatement: '!import-table-item --',
            importTableStatement: '!import-table --',
            doubleBracketStart: '[[',
            doubleBracketStartHTML: '<%%91%%><%%91%%>',
            doubleBracketEnd: ']]',
            doubleBracketEndHTML: '<%%93%%><%%93%%>',
            leftAngleBracketHTML: '<%%60%%>',
            rightAngleBracketHTML: '<%%62%%>',
            percentHTML: '<%%34%%>',
            showGemsAndArt: false,
            showAllWeapons: false,
            showArmor: false,
            showDragonTypes: false,
            showDamageTypes: false,
            showWondrousItems: false,
            showSpellScrolls: false,
            showLootTables: false,
            GemTableName10gp: '5e-Treasure-10gp-Gemstones',
            GemTableName50gp: '5e-Treasure-50gp-Gemstones',
            GemTableName100gp: '5e-Treasure-100gp-Gemstones',
            GemTableName500gp: '5e-Treasure-500gp-Gemstones',
            GemTableName1000gp: '5e-Treasure-1000gp-Gemstones',
            ArtTableName25gp: '5e-Treasure-25gp-Art',
            ArtTableName250gp: '5e-Treasure-250gp-Art',
            ArtTableName750gp: '5e-Treasure-750gp-Art',
            ArtTableName2500gp: '5e-Treasure-2500gp-Art',
            ArtTableName7500gp: '5e-Treasure-7500gp-Art',
            gemDisplay: [],
            artDisplay: [],
            weapons: {},
            weaponList: [],
            weaponDisplay: [],
            damageTypeDisplay: [],
            allArmor: [],
            allArmorDisplay: [],
            heavyArmorDisplay: [],
            mediumArmorDisplay: [],
            heavyMediumArmorDisplay: [],
            lightArmorDisplay: [],
            heavyMediumArmor: [],
            dragonTypeDisplay: [],
            wondrousItemsDisplay: [],
            trinketDisplay: [],
            spellScrollData: [],
            scrollDisplay: [[], [], [], [], [], [], [], [], [], []],
            indvLootTables: [[], [], [], []],
            indvLoot0_4: [],
            indvLoot5_10: [],
            indvLoot11_16: [],
            indvLoot17: [],
            hrdLoot0_4: [],
            hrdLoot5_10: [],
            hrdLoot11_16: [],
            hrdLoot17: [],
        }
    },
    computed: {
        ...mapGetters(['damageTypes', 'heavyArmor', 'mediumArmor', 'lightArmor', 'wondrousItems']),
    },
    async mounted() {
        await this.fetchArmors();
        await this.fetchDetailsByUrl({ "url": "/api/damage-types", "type": "damage_type" });
        await this.fetchWondrousItems();
        this.spellScrollData = await this.fetchSpellsByLevel();
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl', 'fetchArmors', 'fetchWondrousItems', 'fetchSpellsByLevel']),
        formatGemsAndArt() {
            if (this.showGemsAndArt) {
                this.showGemsAndArt = false;
                return;
            }

            //Gems
            let gemTable1 = document.getElementById('gemTableName10').value === '' ? '5e-Treasure-10gp-Gemstones' : document.getElementById('gemTableName10').value;
            let gemTable2 = document.getElementById('gemTableName50').value === '' ? '5e-Treasure-50gp-Gemstones' : document.getElementById('gemTableName50').value;
            let gemTable3 = document.getElementById('gemTableName100').value === '' ? '5e-Treasure-100gp-Gemstones' : document.getElementById('gemTableName100').value;
            let gemTable4 = document.getElementById('gemTableName500').value === '' ? '5e-Treasure-500gp-Gemstones' : document.getElementById('gemTableName500').value;
            let gemTable5 = document.getElementById('gemTableName1000').value === '' ? '5e-Treasure-1000gp-Gemstones' : document.getElementById('gemTableName1000').value;
            let gemTable6 = document.getElementById('gemTableName5000').value === '' ? '5e-Treasure-5000gp-Gemstones' : document.getElementById('gemTableName5000').value;

            this.gemDisplay.push(`${this.importTableStatement}Gems --hide`);

            for (let i = 0; i < Constants.allGems.length; i++) {
                for (let j = 0; j < Constants.allGems[i].length; j++) {
                    let name = i === 0 ? gemTable1 : i === 1 ? gemTable2 : i === 3 ? gemTable3 : i === 4 ? gemTable4 : i === 5 ? gemTable5 : i === 6 ? gemTable6 : '';
                    this.gemDisplay.push(`${this.importItemStatement}${name} --${Constants.allGems[i][j].desc} --${Constants.allGems[i][j].weight}`);
                }
            }

            //Art
            let artTable1 = document.getElementById('artTableName25').value === '' ? '5e-Treasure-25gp-Art' : document.getElementById('artTableName25').value;
            let artTable2 = document.getElementById('artTableName250').value === '' ? '5e-Treasure-250gp-Art' : document.getElementById('artTableName250').value;
            let artTable3 = document.getElementById('artTableName750').value === '' ? '5e-Treasure-750gp-Art' : document.getElementById('artTableName750').value;
            let artTable4 = document.getElementById('artTableName2500').value === '' ? '5e-Treasure-2500gp-Art' : document.getElementById('artTableName2500').value;
            let artTable5 = document.getElementById('artTableName7500').value === '' ? '5e-Treasure-7500gp-Art' : document.getElementById('artTableName7500').value;

            if (artTable1 !== '') {
                this.ArtTableName25gp = artTable1;
            }
            if (artTable2 !== '') {
                this.ArtTableName250gp = artTable2;
            }
            if (artTable3 !== '') {
                this.ArtTableName750gp = artTable3;
            }
            if (artTable4 !== '') {
                this.ArtTableName2500gp = artTable4;
            }
            if (artTable5 !== '') {
                this.ArtTableName7500gp = artTable5;
            }

            this.artDisplay.push(`${this.importTableStatement}Art --hide`);

            for (let i = 0; i < Constants.allArt.length; i++) {
                for (let j = 0; j < Constants.allArt[i].length; j++) {
                    this.artDisplay.push(`${this.importItemStatement}${i === 0 ? artTable1 : i === 1 ? artTable2 : i === 3 ? artTable3 : i === 4 ? artTable4 : i === 5 ? artTable5 : ''} --${Constants.allArt[i][j].desc} --${Constants.allArt[i][j].weight}`);
                }
            }

            this.showGemsAndArt = !this.showGemsAndArt;
            this.showAllWeapons = false;
            this.showArmor = false;
            this.showDragonTypes = false;
            this.showDamageTypes = false;
            this.showWondrousItems = false;
        },
        async copyGems() {
            let gemText = '';
            this.gemDisplay.forEach(element => gemText += `${element}\n`);
            await navigator.clipboard.writeText(gemText);
            const gemToast = document.getElementById('gemToast');

            const myGemToast = Toast.getOrCreateInstance(gemToast);
            myGemToast.show();
        },
        async copyArt() {
            let myArtList = '';
            this.artDisplay.forEach(importStatement => myArtList += `${importStatement}\n`);
            await navigator.clipboard.writeText(myArtList);
            const artToast = document.getElementById('artToast');

            const myArtToast = Toast.getOrCreateInstance(artToast);
            myArtToast.show();
        },
        async getWeapons() {
            this.weapons = await this.fetchDetailsByUrl({ "url": "/api/equipment-categories/weapon", "type": "equipment_category" });
            this.weapons.equipment.forEach(w => this.weaponList.push(w.name));
        },
        async getDamageTypes() {
            await this.fetchDetailsByUrl({ "url": "/api/damage-types", "type": "damage_type" });
        },
        async formatWeapons() {
            //Weapons (All)
            await this.getWeapons();
            this.weaponDisplay.push(`${this.importTableStatement}WeaponAny --hide`);
            this.weaponList.forEach(weapon => this.weaponDisplay.push(`${this.importItemStatement}WeaponAny --${weapon} --1`));

            //Damage Types
            await this.getDamageTypes();
            this.damageTypeDisplay.push(`${this.importTableStatement}DamageTypes --hide`);
            this.damageTypes.forEach(d => this.damageTypeDisplay.push(`${this.importItemStatement}DamageTypes --${d.name} --1`));

            //Toggle the section
            this.showGemsAndArt = false;
            this.showAllWeapons = !this.showAllWeapons;
            this.showArmor = false;
            this.showDragonTypes = false;
            this.showDamageTypes = false;
            this.showWondrousItems = false;
        },
        async copyAllWeapons() {
            let myWeaponList = '';
            this.weaponDisplay.forEach(importStatement => myWeaponList += `${importStatement}\n`);
            await navigator.clipboard.writeText(myWeaponList);
            const weaponToast = document.getElementById('weaponToast');

            const myWeaponToast = Toast.getOrCreateInstance(weaponToast);
            myWeaponToast.show();
        },
        async copyDamageTypes() {
            let myDamageTypeList = '';
            this.damageTypeDisplay.forEach(importStatement => myDamageTypeList += `${importStatement}\n`);
            await navigator.clipboard.writeText(myDamageTypeList);
            const damgeTypeToast = document.getElementById('damageTypeToast');

            const myDamgeTypeToast = Toast.getOrCreateInstance(damgeTypeToast);
            myDamgeTypeToast.show();
        },
        async fetchArmor() {
            toRaw(this.heavyArmor).forEach(ha => this.heavyMediumArmor.push(ha));
            toRaw(this.mediumArmor).forEach(m => this.heavyMediumArmor.push(m));
            toRaw(this.heavyArmor).forEach(a => this.allArmor.push(a));
            toRaw(this.mediumArmor).forEach(a => this.allArmor.push(a));
            toRaw(this.lightArmor).forEach(a => this.allArmor.push(a));
        },
        async formatArmor() {
            //Format lists
            await this.fetchArmor();

            //All Armor
            this.allArmorDisplay.push(`${this.importTableStatement}AllArmor --hide`);
            this.allArmor.forEach(aa => this.allArmorDisplay.push(`${this.importItemStatement}AllArmor --${aa.name} --1`));

            //Heavy Armor
            this.heavyArmorDisplay.push(`${this.importTableStatement}HeavyArmor --hide`);
            this.heavyArmor.forEach(ha => this.heavyArmorDisplay.push(`${this.importItemStatement}HeavyArmor --${ha.name} --1`));

            //Medium Armor
            this.mediumArmorDisplay.push(`${this.importTableStatement}MediumArmor --hide`);
            this.mediumArmor.forEach(ma => this.mediumArmorDisplay.push(`${this.importItemStatement}MediumArmor --${ma.name} --1`));

            //Heavy and Medium Armor
            this.heavyMediumArmorDisplay.push(`${this.importTableStatement}HeavyMediumArmor --hide`);
            this.heavyMediumArmor.forEach(hma => this.heavyMediumArmorDisplay.push(`${this.importItemStatement}HeavyMediumArmor --${hma.name} --1`));

            //Light Armor
            this.lightArmorDisplay.push(`${this.importTableStatement}LightArmor --hide`);
            this.lightArmor.forEach(la => this.lightArmorDisplay.push(`${this.importItemStatement}LightArmor --${la.name} --1`));

            this.showArmor = !this.showArmor;
            this.showGemsAndArt = false;
            this.showAllWeapons = false;
            this.showDragonTypes = false;
            this.showDamageTypes = false;
            this.showWondrousItems = false;
        },
        async copyArmor(type) {
            let aList = '';
            const myToast = document.getElementById('armorToast');
            const myArmorToast = Toast.getOrCreateInstance(myToast);

            switch (type) {
                case 'all':
                    aList = [];
                    for (let i = 0; i < this.allArmor.length; i++) {
                        for (let j = 0; j < this.allArmor[i].length; j++) {
                            aList += this.allArmor[i][j];
                        }
                    }
                    await navigator.clipboard.writeText(aList);
                    myArmorToast.show();
                    break;
                case 'heavy':
                    aList = [];
                    this.heavyArmorDisplay.forEach(statement => aList += `${statement}`)
                    await navigator.clipboard.writeText(aList);

                    myArmorToast.show();
                    break;
                case 'medium':
                    aList = [];
                    this.heavyArmorDisplay.forEach(statement => aList += `${statement}`)
                    await navigator.clipboard.writeText(aList);

                    myArmorToast.show();
                    break;
                case 'mediumHeavy':
                    aList = [];
                    this.heavyArmorDisplay.forEach(statement => aList += `${statement}`)
                    await navigator.clipboard.writeText(aList);

                    myArmorToast.show();
                    break;
                case 'allArmorTables':
                    aList = [];
                    this.allArmorDisplay.forEach(statement => aList += `${statement}`);
                    this.heavyArmorDisplay.forEach(statement => aList += `${statement}`);
                    this.mediumArmorDisplay.forEach(statement => aList += `${statement}`);
                    this.lightArmorDisplay.forEach(statement => aList += `${statement}`);
                    this.heavyMediumArmorDisplay.forEach(statement => aList += `${statement}`);

                    await navigator.clipboard.writeText(aList);

                    myArmorToast.show();
                    break;
                case 'light':
                    aList = [];
                    this.heavyArmorDisplay.forEach(statement => aList += `${statement}`)
                    await navigator.clipboard.writeText(aList);

                    myArmorToast.show();
                    break;
            }
        },
        formatDragonTypes() {
            //Dragon Types
            this.dragonTypeDisplay.push(`${this.importTableStatement}DragonTypes --hide`);
            Constants.dragonTypes.forEach(d => this.dragonTypeDisplay.push(`${this.importItemStatement}DragonTypes --${d.type} --1`));

            //Toggle the section
            this.showDragonTypes = !this.showDragonTypes;
            this.showGemsAndArt = false;
            this.showAllWeapons = false;
            this.showArmor = false;
            this.showDamageTypes = false;
            this.showWondrousItems = false;
        },
        async copyDragonTypes() {
            let typeList = '';
            this.dragonTypeDisplay.forEach(importStatement => typeList += `${importStatement}\n`);
            await navigator.clipboard.writeText(typeList);
            const dtToast = document.getElementById('dragonTypeToast');

            const myDTToast = Toast.getOrCreateInstance(dtToast);
            myDTToast.show();
        },
        formatDamageTypes() {
            //Damage Types
            this.damageTypeDisplay.push(`${this.importTableStatement}DamageTypes --hide`);
            this.damageTypes.every(d => {
                if (d.name !== 'Bludgeoning' && d.name !== 'Piercing' && d.name !== "Slashing") {
                    this.damageTypeDisplay.push(`${this.importItemStatement}DamageTypes --${d.name} --1`);
                }

                return true;
            })

            //Toggle the section
            this.showDamageTypes = !this.showDamageTypes;
            this.showGemsAndArt = false;
            this.showAllWeapons = false;
            this.showArmor = false;
            this.showDragonTypes = false;
            this.showWondrousItems = false;
        },
        async formatWondrousItems() {
            for (let i = 0; i < this.wondrousItems.length; i++) {
                if (this.wondrousItems[i].type === "FeatherToken") {
                    this.wondrousItemsDisplay.push(`${this.importTableStatement}FeatherToken --hide`);
                    this.wondrousItems[i].variants.forEach(ft => this.wondrousItemsDisplay.push(`${this.importItemStatement}FeatherToken ${ft.name} --1`));
                }
                if (this.wondrousItems[i].type === "FigurineOfWondrousPower") {
                    this.wondrousItemsDisplay.push(`${this.importTableStatement}FigurineOfWondrousPower --hide`);
                    this.wondrousItems[i].variants.forEach(ft => this.wondrousItemsDisplay.push(`${this.importItemStatement}FigurineOfWondrousPower ${ft.name} --1`));
                }
                if (this.wondrousItems[i].type === "RangedWeapons") {
                    this.wondrousItemsDisplay.push(`${this.importTableStatement}RangedWeapons --hide`);
                    this.wondrousItems[i].variants.forEach(ft => this.wondrousItemsDisplay.push(`${this.importItemStatement}RangedWeapons ${ft.name} --1`));
                }
                if (this.wondrousItems[i].type === "MartialWeapons") {
                    this.wondrousItemsDisplay.push(`${this.importTableStatement}MartialWeapons --hide`);
                    this.wondrousItems[i].variants.forEach(ft => this.wondrousItemsDisplay.push(`${this.importItemStatement}MartialWeapons ${ft.name} --1`));
                }
                if (this.wondrousItems[i].type === "SimpleWeapons") {
                    this.wondrousItemsDisplay.push(`${this.importTableStatement}SimpleWeapons --hide`);
                    this.wondrousItems[i].variants.forEach(ft => this.wondrousItemsDisplay.push(`${this.importItemStatement}SimpleWeapons ${ft.name} --1`));
                }
            }

            this.wondrousItemsDisplay.push(`${this.importTableStatement}SlashingWeapons --hide`);
            toRaw(Constants.slashingWeapons).forEach(item => this.wondrousItemsDisplay.push(`${this.importItemStatement}SlashingWeapons ${item.name} --${item.weight}`));

            this.wondrousItemsDisplay.push(`${this.importTableStatement}WeaponSword --hide`);
            toRaw(Constants.weaponsSword).forEach(item => this.wondrousItemsDisplay.push(`${this.importItemStatement}WeaponSword ${item.name} --${item.weight}`));

            this.wondrousItemsDisplay.push(`${this.importTableStatement}SwordAxe --hide`);
            toRaw(Constants.swordAxe).forEach(item => this.wondrousItemsDisplay.push(`${this.importItemStatement}SwordAxe ${item.name} --${item.weight}`));

            //Trinkets
            this.trinketDisplay.push(`${this.importTableStatement}Trinkets --hide`);
            toRaw(Constants.trinkets).forEach(t => this.trinketDisplay.push(`${this.importItemStatement}Trinkets --${t.name} -- ${t.weight}`));

            this.showWondrousItems = !this.showWondrousItems;
            this.showGemsAndArt = false;
            this.showAllWeapons = false;
            this.showArmor = false;
            this.showDragonTypes = false;
            this.showDamageTypes = false;
        },
        async copySubLists() {
            let subList = '';
            this.wondrousItemsDisplay.forEach(importStatement => subList += `${importStatement}\n`);
            await navigator.clipboard.writeText(subList);
            const dtToast = document.getElementById('wondrousTypeToast');

            const myDTToast = Toast.getOrCreateInstance(dtToast);
            myDTToast.show();
        },
        async copyTrinkets() {
            let trinketText = '';
            this.trinketDisplay.forEach(importStatement => trinketText += `${importStatement}\n`);
            await navigator.clipboard.writeText(trinketText);
            const dtToast = document.getElementById('trinketTypeToast');

            const myDTToast = Toast.getOrCreateInstance(dtToast);
            myDTToast.show();
        },
        async formatSpellScrolls() {
            //Cantrips
            this.scrollDisplay[0].push(`${this.importTableStatement}CantripScrolls --hide`);
            this.spellScrollData[0].forEach(d => {
                this.scrollDisplay[0].push(`${this.importItemStatement}CantripScrolls --${d.name} --1`);
            });

            //Level 1 Spells
            this.scrollDisplay[1].push(`${this.importTableStatement}LevelOneScrolls --hide`);
            this.spellScrollData[1].forEach(d => {
                this.scrollDisplay[1].push(`${this.importItemStatement}LevelOneScrolls --${d.name} --1`);
            });

            //Level 2 Spells
            this.scrollDisplay[2].push(`${this.importTableStatement}LevelTwoScrolls --hide`);
            this.spellScrollData[2].forEach(d => {
                this.scrollDisplay[2].push(`${this.importItemStatement}LevelTwoScrolls --${d.name} --1`);
            });

            //Level 3 Spells
            this.scrollDisplay[3].push(`${this.importTableStatement}LevelThreeScrolls --hide`);
            this.spellScrollData[3].forEach(d => {
                this.scrollDisplay[3].push(`${this.importItemStatement}LevelThreeScrolls --${d.name} --1`);
            });

            //Level 4 Spells
            this.scrollDisplay[4].push(`${this.importTableStatement}LevelFourScrolls --hide`);
            this.spellScrollData[4].forEach(d => {
                this.scrollDisplay[4].push(`${this.importItemStatement}LevelFourScrolls --${d.name} --1`);
            });

            //Level 5 Spells
            this.scrollDisplay[5].push(`${this.importTableStatement}LevelFiveScrolls --hide`);
            this.spellScrollData[5].forEach(d => {
                this.scrollDisplay[5].push(`${this.importItemStatement}LevelFiveScrolls --${d.name} --1`);
            });

            //Level 6 Spells
            this.scrollDisplay[6].push(`${this.importTableStatement}LevelSixScrolls --hide`);
            this.spellScrollData[6].forEach(d => {
                this.scrollDisplay[6].push(`${this.importItemStatement}LevelSixScrolls --${d.name} --1`);
            });

            //Level 7 Spells
            this.scrollDisplay[7].push(`${this.importTableStatement}LevelSevenScrolls --hide`);
            this.spellScrollData[7].forEach(d => {
                this.scrollDisplay[7].push(`${this.importItemStatement}LevelSevenScrolls --${d.name} --1`);
            });

            //Level 8 Spells
            this.scrollDisplay[8].push(`${this.importTableStatement}LevelEightScrolls --hide`);
            this.spellScrollData[8].forEach(d => {
                this.scrollDisplay[8].push(`${this.importItemStatement}LevelEightScrolls --${d.name} --1`);
            });

            //Level 9 Spells
            this.scrollDisplay[9].push(`${this.importTableStatement}LevelNineScrolls --hide`);
            this.spellScrollData[9].forEach(d => {
                this.scrollDisplay[9].push(`${this.importItemStatement}LevelNineScrolls --${d.name} --1`);
            });

            //Toggle the section
            this.showDamageTypes = false;
            this.showGemsAndArt = false;
            this.showAllWeapons = false;
            this.showArmor = false;
            this.showDragonTypes = false;
            this.showWondrousItems = false;
            this.showLootTables = false;
            this.showSpellScrolls = !this.showSpellScrolls;
        },
        async copyScrolls(level) {
            let myList = '';
            let myToast;
            let myOtherToast;
            switch (level) {

                case "cantrip":
                    myList = '';
                    this.scrollDisplay[0].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('cantripTypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lOne":
                    myList = '';
                    this.scrollDisplay[1].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveOneToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lTwo":
                    myList = '';
                    this.scrollDisplay[2].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveTwoToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lThree":
                    myList = '';
                    this.scrollDisplay[3].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveThreeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lFour":
                    myList = '';
                    this.scrollDisplay[4].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('levelFourToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lFive":
                    myList = '';
                    this.scrollDisplay[5].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveFiveToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lSix":
                    myList = '';
                    this.scrollDisplay[6].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveSixToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lSeven":
                    myList = '';
                    this.scrollDisplay[7].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveSevenToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lEight":
                    myList = '';
                    this.scrollDisplay[8].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveEightToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "lNine":
                    myList = '';
                    this.scrollDisplay[9].forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('leveNineToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "all":
                    myList = '';

                    for (let i = 0; i < this.scrollDisplay.length; i++) {
                        for (let j = 0; j < this.scrollDisplay[i].length; j++) {
                            myList += this.scrollDisplay[i][j] + '\n';
                            //this.scrollDisplay[i][j].forEach(importStatement => myList += `${importStatement}\n`);
                        }
                    }

                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('allScrollsToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
            }
        },
        formatLootTables() {
            //Individual Loot
            this.indvLoot0_4.push(`${this.importTableStatement}LootIndv0-4 --hide`);
            toRaw(Constants.indv0_4).forEach(item => this.indvLoot0_4.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootIndv0-4 --${item.weight}`));

            this.indvLoot5_10.push(`${this.importTableStatement}LootIndv5-10 --hide`);
            toRaw(Constants.indv5_10).forEach(item => this.indvLoot5_10.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootIndv5-10 --${item.weight}`));

            this.indvLoot11_16.push(`${this.importTableStatement}LootIndv11-16 --hide`);
            toRaw(Constants.indv11_16).forEach(item => this.indvLoot11_16.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootIndv11-16 --${item.weight}`));

            this.indvLoot17.push(`${this.importTableStatement}LootIndv17Plus --hide`);
            toRaw(Constants.indv17Plus).forEach(item => this.indvLoot17.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootIndv17 --${item.weight}`));

            //Hoard Loot
            this.hrdLoot0_4.push(`${this.importTableStatement}LootHrd0-4 --hide`);
            toRaw(Constants.hrd0_4).forEach(item => this.hrdLoot0_4.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootHrd0-4 --${item.weight}`));

            this.hrdLoot5_10.push(`${this.importTableStatement}LootHrd5-10 --hide`);
            toRaw(Constants.hrd5_10).forEach(item => this.hrdLoot5_10.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootHrd0-4 --${item.weight}`));

            this.hrdLoot11_16.push(`${this.importTableStatement}LootHrd11-16 --hide`);
            toRaw(Constants.hrd11_16).forEach(item => this.hrdLoot11_16.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootHrd0-4 --${item.weight}`));

            this.hrdLoot17.push(`${this.importTableStatement}LootHrd17Plus --hide`);
            toRaw(Constants.hrd17Plus).forEach(item => this.hrdLoot17.push(`${this.importItemStatement}${this.doubleBracketStartHTML + item.value + this.doubleBracketEndHTML + item.type},` +
                `${this.doubleBracketStartHTML}1t<%%91%%>Trinkets<%%91%%>${this.doubleBracketEndHTML} ` +
                `--LootHrd0-4 --${item.weight}`));

            //Toggle the section
            this.showDamageTypes = false;
            this.showGemsAndArt = false;
            this.showAllWeapons = false;
            this.showArmor = false;
            this.showDragonTypes = false;
            this.showWondrousItems = false;
            this.showLootTables = !this.showLootTables;
            this.showSpellScrolls = false;
        },
        async copyLootTable(id) {
            let myList = '';
            let myToast = null;
            let myOtherToast = null;

            switch (id) {
                case "indv0-4":
                    myList = '';
                    this.indvLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('indv0-4TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "indv5-10":
                    myList = '';
                    this.indvLoot5_10.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('indv5-10TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "indv11-16":
                    myList = '';
                    this.indvLoot11_16.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('indv11-16TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "indv17":
                    myList = '';
                    this.indvLoot17.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('indv17Toast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "hrd0-4":
                    myList = '';
                    this.hrdLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('hrd0-4TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "hrd5-10":
                    myList = '';
                    this.hrdLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('hrd0-4TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "hrd11-16":
                    myList = '';
                    this.hrdLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('hrd0-4TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case "hrd17":
                    myList = '';
                    this.hrdLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('hrd0-4TypeToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                case 'all':
                    myList = '';

                    this.indvLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    this.indvLoot5_10.forEach(importStatement => myList += `${importStatement}\n`);
                    this.indvLoot11_16.forEach(importStatement => myList += `${importStatement}\n`);
                    this.indvLoot17.forEach(importStatement => myList += `${importStatement}\n`);
                    this.hrdLoot0_4.forEach(importStatement => myList += `${importStatement}\n`);
                    this.hrdLoot5_10.forEach(importStatement => myList += `${importStatement}\n`);
                    this.hrdLoot11_16.forEach(importStatement => myList += `${importStatement}\n`);
                    this.hrdLoot17.forEach(importStatement => myList += `${importStatement}\n`);

                    await navigator.clipboard.writeText(myList);
                    myToast = document.getElementById('allLootTableToast');

                    myOtherToast = Toast.getOrCreateInstance(myToast);
                    myOtherToast.show();
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style>
.input-group {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>