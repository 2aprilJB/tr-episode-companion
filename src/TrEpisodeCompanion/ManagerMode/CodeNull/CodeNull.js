import React, { Component } from "react";
import "./CodeNull.css";
import axios from "axios";

class CodeNull extends Component{
    state = { //Put array of codes to be updated
        artifactsCode: [["2JLMJQHthTtyvkj"],["2kDf2B5cVp9iZ4t"],["2xxtC9qZYwajq78"],["4Hz9VbHxBnQWVVX"],["4QcPy3GnBbx4Sx2"],["67jA3EZK2xHB3YA"],["82ABsLxDjRs9auy"],["8mYjE9WrvsJgvKS"],["APPDt9fNsEZTGFZ"],["AYbXhgdq2MJDDdT"],["BK245SvNXon8ur7"],["BPYKSmJC35rHWcs"],["BRALduwbKGQNk6E"],["Cm4hdcR4iiwtwpj"],["CtC4jupb5PQt6w7"],["CwiD6DwYYCKhA6q"],["D77mQM4i9SyaYzg"],["DaU6zDrS4uhM4ff"],["Dwf3LbVG5XTgxFo"],["EdCnfCz96Vw6cwB"],["EdEZfriijVzoPYg"],["ExsFFRZhUsEZgBV"],["FexxD2qiZvp4po5"],["G6oyQc5wmhauC8X"],["Gf759a5PUxL6NXE"],["H7aMmGUoN4sZgdt"],["HD8kEW7oNQGro55"],["HpGQN8jkhcmdnmb"],["JMDqgpP94QKoEeH"],["KKaRtSF9QNpKUYK"],["KvyFkQZuziYWCYa"],["L78TjCXg7Eyux8M"],["LTh7q5QEgK52Hca"],["LovCakMrYnZZ5cy"],["MJDM3mXskaPPt8C"],["MXSNHHUVQSmEJ5U"],["QKoBdYdBgxaAYMv"],["QSFeZgKDzziiWNX"],["Qa7gRNFEfmUPUSG"],["Qv6DrgfHWivob77"],["RKTaBLq5HuGWPNn"],["RjBi7c4Ff9rmPiC"],["SDbi3tB5aJyGqWJ"],["SS5REaCugG4PjyG"],["SVWsxdLxzpBNfeo"],["SZz3PcZJh5euBk2"],["UUJAfcAgUhYnYvu"],["UVsskeyw5jwLMNG"],["UWqz7Xwzqm7hSCA"],["V5KTFqy3QjqVeGD"],["VRj28PfE8bA7z9w"],["WcjrafLQA4ise3w"],["Wuhp9b9JK86mHbY"],["Xhqy7KyXmb2AC3r"],["YbRrCZauFDT7ekr"],["YdqvxxUuzkXgxPC"],["Yp6AvqHEEe4ihM5"],["ZQmAoLfDREctjR8"],["ZUG3xiwyXuG9EX6"],["ZjZWpcAuMqBu7sA"],["a63wdGbNERHMpa5"],["aCrEahwmLWnrEYk"],["b5RLrSWpuUA2xDJ"],["bbTqjAtUhBixvsA"],["bza5NNzwUcDGxjZ"],["cSuNdR3gM2yuhno"],["dvqrTPaYCbu9T83"],["eXpL2bTtqrJonfb"],["foYN97mrvgzxzfw"],["gW7ga3dwaYk4hfx"],["gqAaugd5Qxp49Qj"],["gtaNzg4gpSmknmC"],["hJBPtEuC5h7RUFp"],["hgxq4KDDQnLfDdt"],["hqfxkrJQWUySWrF"],["jjUX2TMExwDtacb"],["jvrcE3pVMgTWvsv"],["kGvs3kKPBRiy5gh"],["kJtmEhtJw2ejJEV"],["kmvqfevENfsFPAP"],["kqdqnxMFFJkyniW"],["kvz8FYgH7k4cKA3"],["mAMxZWF3MpVmGVW"],["mgnZKBCHCRr6J3U"],["mq8E4JwZjsC3EgA"],["muyQwyGhLXBcygT"],["nBUHKgNiTxgKfQT"],["nUKGRNBDCgZKjsc"],["nyQrM9tnSnKQnJR"],["ohhExfYetv3eYBU"],["ootDX8x8SGJxMUR"],["pRdJeoNkkQe543y"],["pRrZmbZjLbVZVWV"],["pbqjhNuNtAT77xF"],["pzrUd7ThTqF5rKD"],["q82SRp3qXgffQtG"],["r99FJzPh8u9bUy8"],["riwVLxaVz77qQTZ"],["ruHR4xBaQbnmchD"],["sXi35xooa3ZiT4A"],["sdawYAQWMEfjgJs"],["swjPPH8TzLQEaZd"],["tgziBNhoy6w5vHK"],["uVoyYaqET9ao8Zt"],["uokJh8abQzADFmR"],["v2YB7uY3bwvonCS"],["ww3JhcTYGatBoxb"],["x5mtu2ABVjfkjXn"],["x9CLJZ7HBDucjyS"],["xSWQPuWRYdon4w8"],["xXuTdzPfU8ksiy3"],["xqFuHJkzMDUQxMm"],["xtMkWjtq8RksQnS"],["y96xnv9gwjGbMqS"],["yBhdDyzyXYuyRty"],["yEqkFByQAFoSczB"],["ynXouk6pswt77fL"],["z3qdkJUoFEFaRqH"],["znTx6Mrwshfm5mp"],["zrTH9MYN5YgmPDL"]]
    }

    componentDidMount(){
        //Initializing a pointable object by fetching Credentials Array
        axios.get(this.props.baseUrl + 'credentials.json')
             .then(resp=>{
                let creds = resp.data;
                let pointTableObj = {};
                creds.map(ele=>{
                    if(ele[3].split("").length===1){
                        pointTableObj[ele[3]] = 0;
                    }
                    else{}
                });
                //Now Time to update the pointTable
                axios.put(this.props.baseUrl + 'points.json',pointTableObj)
                     .catch(err=>{
                        console.log(err);
                        alert('There is another Network Error you Moronic Developer')
                     })

                //Initializing Artifacs Codes to Blank
                let artifacts = {
                    boats: [["Blank","Z"]],   //boats: [["Blank","Z"],['code','Z','0000']]
                    planes: [["Blank","Z"]],
                }
                this.state.artifactsCode.map((ele,ind)=>{
                    if(ind<80){
                        artifacts.boats = [...artifacts.boats,[ele[0],'Z','0000']];
                    }
                    else if(ind>79){
                        artifacts.planes = [...artifacts.planes,[ele[0],'Z','0000']];
                    }
                })
                axios.put(this.props.baseUrl + 'artifacts.json',artifacts)
                     .catch(err=>{
                        alert('Network Error');
                        console.log(err);
                     })
             })
             .catch(err=>{
                console.log(err);
                alert('Network problem you moronic Developer')
             })
    }
    render(){
        return(
            <div></div>
        );
    }
}

export default CodeNull;


