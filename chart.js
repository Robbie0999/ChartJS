// FETCHING DATA AND PUSH ON TABLE OF EINDHOVEN
async function getData(){
    const xs = [];
    const ys = [];

    const response = await fetch('crimiEindhoven.csv');
    const data = await response.text();

    const table = data.split('\n');
    table.forEach(row => {
        const columns = row.split(';');
        const sort = columns[0];
        xs.push(sort);
        const percentage = columns[1];
        ys.push(parseFloat(percentage));
        console.log(sort, percentage);
    });
    return{ xs, ys };
}

// FETCHING DATA AND PUSH ON TABLE OF IRISBUURT
async function getData2(){
    const xs2 = [];
    const ys2 = [];

    const response = await fetch('crimiIrisbuurt.csv');
    const data = await response.text();

    const table = data.split('\n');
    table.forEach(row => {
        const columns = row.split(';');
        const sort = columns[0];
        xs2.push(sort);
        const percentage = columns[1];
        ys2.push(parseFloat(percentage));
        console.log(sort, percentage);
    });
    return{ xs2, ys2 };
}

// CREATING CHART AND DISPLAY DATA
chartIt();

async function chartIt() {
    const data = await getData();
    const data2 = await getData2();
    const ctx = document.getElementById('myChart').getContext('2d');

    Chart.defaults.font.family = "'Montserrat', sans-serif"

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: 
            [{
                label: 'Eindhoven',
                labels: data.xs,
                data: data.ys,
                backgroundColor: 'rgba(30, 217, 34, 0.2)',
                borderColor: 'rgba(30, 217, 34, 1)',
                borderWidth: 1,
                fill: true,
                animations:{
                    y:{
                        duration: 3000,
                        delay: 500
                    }
                }
            },
            {
                label: 'Irisbuurt',
                data: data2.ys2,
                backgroundColor: 'rgba(0, 255, 139, 0.5)',
                borderColor: 'rgba(0, 255, 139, 1)',
                borderWidth: 1,
                fill: true,
                animations:{
                    y:{
                        duration: 3000
                    }
                }
            }],
        },
        options:{
            responsive: true,
            plugins: {
                 legend: {
                     position: 'right'
                    },
                 title: {
                    display: true,
                    text: 'Registrated crime in Eindhoven and Irisbuurt in 2020 per 1,000 inhabitants'
                },
                tooltip:{
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                }, 
             },
             interaction:{
                 intersect: false,
                 mode: 'index'
             },
             scales:{
                y:{
                    min: 0,
                    max: 20,
                    ticks:{
                        stepSize: 5
                    }
                }
            },
            animation:{
                y:{
                    easing: 'easeOutElastic',
                    from: (ctx) =>{
                        if(ctx.type === 'data'){
                            if(ctx.mode === 'default' && !ctx.dropped){
                                ctx.dropped = true;
                                return 0;
                            }
                        }
                    }
                }
            }   
         }
    });
}

// GETTING LIVE DATA API
const api_url = 'https://opendata.cbs.nl/ODataApi/odata/83648NED'
async function getAPI (){
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
}

getAPI();