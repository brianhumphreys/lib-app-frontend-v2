<template>
    <div>
        <button class="filter-button btn btn-primary btn-block scan-button" :class="{ toggled: isToggled }" @click="isToggled = !isToggled">
            Scan Barcode
        </button>
        <div v-if="isToggled" class="scanner">
            <StreamBarcodeReader @decode="(a, b, c) => onDecode(a, b, c)" @loaded="() => onLoaded()">
            </StreamBarcodeReader>
            Input Value: {{ text || "Nothing" }}
        </div>
    </div>


</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
    name: "BarcodeScanner",
    components: {
        StreamBarcodeReader,
    },
    data() {
        return {
            text: "",
            id: null,
            isToggled: false,
            lastSameRecord: 0,
        };
    },
    props: {
        msg: String,
    },
    methods: {
        onDecode(a, b, c) {
            console.log(a, b, c);
            this.text = a;
            if (a != undefined) {
                if (Date.now() - this.lastSameRecord > 3) {
                    this.lastSameRecord = Date.now();
                    this.$store.dispatch("books/getBookInfo", a);
                }
                
            }
            if (this.id) clearTimeout(this.id);
            this.id = setTimeout(() => {
                if (this.text === a) {
                    this.text = "";
                }
            }, 5000);
        },
        onLoaded() {
            console.log("load");
        },
    },
};
</script>
<style scoped>
.scanner {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.filter-button {
    width: 200px;
}

.toggled {
    background-color: red;
    border-color: red;
}

.scan-button {
    margin-top: 15px;
}
</style>
