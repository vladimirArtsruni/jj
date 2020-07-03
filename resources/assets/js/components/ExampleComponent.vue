<template>
    <div class="row mt-4">
        <div class="col-md-4">
            <label><strong>Vehicle Type</strong></label>
            <div class="form-group border p-1" style="max-height: 200px;overflow-y: auto">
                <fieldset class="checkboxes-box" id="vehicleTypeList">
                    <div v-for="item in vehicleTypes">
                        <label>
                            <input type="checkbox" :id="'vehicleTypes'+item.value" :ref="'vehicleTypes'+item.value"
                                   name="vehicleTypes[]" :value="item.value"
                                   v-model="type">
                            {{item.name}}
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>
        <div class="col-md-4">
            <label><strong>Make:</strong></label>
            <div class="form-group border p-1" style="max-height: 200px;overflow-y: auto">
                <div v-for="item in makersTypes">
                    <label>
                        <input type="checkbox" :id="'makers'+item.value" :ref="'makers'+item.value"
                               name="makers[]" :value="item.value"
                               v-model="makers">
                        {{item.label}}
                    </label>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <label><strong>Models:</strong></label>
            <div class="form-group border p-1" style="max-height: 200px;overflow-y: auto">
                <div v-for="item in modelsTypes">
                    <label>
                        <input type="checkbox" :id="'models'+item.value" :ref="'models'+item.value"
                               name="models[]" :value="item.value"
                               v-model="models">
                        {{item.label}}
                    </label>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <button class="btn btn-dark float-right" @click="getCars">Submit</button>
        </div>
        <div class="col-md-12 mt-4">
            <section class="manheim-search-result manheim road-bg">
                <div class="container">
                    <div class="search-item clearfix" v-for="item in inventories">
                        <div class="search-item-image"><a href="#"><img :src="item.main_photo" alt="" style="max-width: 228px"></a></div>
                        <div class="search-item-content">
                            <div class="prod-mobile-title"><a href="#">{{item.title}}</a></div>
                            <div class="row">
                                <div class="col-md-4 cm4">
                                    <div class="search-item-table">
                                        <table class="table table-bordered">
                                            <tr>
                                                <td>Лот</td>
                                                <td>{{item.title}}</td>
                                            </tr>
                                            <tr>
                                                <td>VIN</td>
                                                <td class="prod-title">{{item.vin}}</td>
                                            </tr>
                                            <tr>
                                                <td>Цвет</td>
                                                <td>	{{item.color}}</td>
                                            </tr>
                                            <tr>
                                                <td>Ожидаемая цена</td>
                                                <td>MMR: <span class="nr">{{item.price_mmr}}</span></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="search-item-table">
                                        <table class="table table-bordered">
                                            <tr>
                                                <td>
                                                    Дата/Аукцион</td>
                                                <td>{{item.date_auction}}</td>
                                            </tr>
                                            <tr>
                                                <td>Отчет о состоянии</td>
                                                <td><span class="icon-cr">{{item.cr}}  {{item.cr_rate}}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Пробег</td>
                                                <td>{{item.odometr}}</td>
                                            </tr>
                                            <tr>
                                                <td>Двигатель</td>
                                                <td>{{item.engine}} </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="search-item-table">
                                        <table class="table table-bordered">
                                            <tr>
                                                <td>
                                                    Город</td>
                                                <td>FL - Manheim Central Florida</td>
                                            </tr>
                                            <tr>
                                                <td>Площадка</td>
                                                <td>FL - Manheim Central Florida</td>
                                            </tr>
                                            <tr>
                                                <td>Продавец</td>
                                                <td>LEXUS OF PEMBROKE PINES</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="search-item-buttons">
                                <div class="prod-actions">
                                    <a href="#" class="btn btn-solid">Подробнее</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>


<script>
    import vehicleType from "../vehicleType";
    import querystring from 'querystring';
    import axios from 'axios';

    export default {
        data() {
            return {
                vehicleTypes: [],
                type: [],


                makersTypes: [],
                makers: [],

                modelsTypes: [],
                models: [],

                inventories: []
            }
        },
        watch: {
            // whenever question changes, this function will run
            type: function (type) {
                var queryString = querystring.stringify({'type[]': type});
                // this.typeQueryString = queryString;
                // this.generateUrl('type',type);

                this.getMakers(queryString)


            },
            makers: function (makers) {
                var queryString = querystring.stringify({'models[]': makers});

                this.getModels(queryString);
            }

        },
        mounted() {
            this.vehicleTypes = vehicleType;
            console.log(9)
        },
        methods: {
            urlTypeWatcher() {
                const query = window.location.search.substr(1);
                const url = querystring.parse(query, null, null);

                if (url['type[]']) {
                    this.type = url['type[]'];

                }

                if (url['makers[]']) {
                    this.type = url['makers[]'];
                }


            },

            generateUrl() {

                window.history.replaceState(null, null, `${location.pathname}?${this.typeQueryString}`);
            },

            getMakers(queryString) {

                axios.get('/makesMakers?' + queryString).then(resp => {
                    console.log(typeof resp.data)

                    this.makersTypes = resp.data.makes
                })
            },

            getCars() {
                var queryStringTypes = querystring.stringify({'type[]': this.type});
                var queryStringMakers = querystring.stringify({'make[]': this.makers});
                var queryStringModels = querystring.stringify({'models[]': this.models});
                axios.post('/getResult',{
                    vehicleTypes : this.type,
                    make : this.makers,
                    model : this.models
                }).then(resp => {

                    this.inventories = resp.data.inventories
                })

            },

            getModels(queryString) {

                axios.get('/makesModels?' + queryString).then(resp => {
                    this.modelsTypes = resp.data.models;
                })
            }
        }
    }
</script>
