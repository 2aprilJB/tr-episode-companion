import React, { Component } from "react";
import "./CodeNull.css";
import axios from "axios";

class CodeNull extends Component{
    state = { //Put array of codes to be updated
        artifactsCode: [["Blank","Z"],["2JLMJQHthTtyvkj","Z","0000"],["2kDf2B5cVp9iZ4t","Z","0000"],["2xxtC9qZYwajq78","Z","0000"],["4Hz9VbHxBnQWVVX","Z","0000"],["4QcPy3GnBbx4Sx2","Z","0000"],["67jA3EZK2xHB3YA","Z","0000"],["82ABsLxDjRs9auy","Z","0000"],["8mYjE9WrvsJgvKS","Z","0000"],["APPDt9fNsEZTGFZ","Z","0000"],["AYbXhgdq2MJDDdT","Z","0000"],["BK245SvNXon8ur7","Z","0000"],["BPYKSmJC35rHWcs","Z","0000"],["BRALduwbKGQNk6E","Z","0000"],["Cm4hdcR4iiwtwpj","Z","0000"],["CtC4jupb5PQt6w7","Z","0000"],["CwiD6DwYYCKhA6q","Z","0000"],["D77mQM4i9SyaYzg","Z","0000"],["DaU6zDrS4uhM4ff","Z","0000"],["Dwf3LbVG5XTgxFo","Z","0000"],["EdCnfCz96Vw6cwB","Z","0000"],["EdEZfriijVzoPYg","Z","0000"],["ExsFFRZhUsEZgBV","Z","0000"],["FexxD2qiZvp4po5","Z","0000"],["G6oyQc5wmhauC8X","Z","0000"],["Gf759a5PUxL6NXE","Z","0000"],["H7aMmGUoN4sZgdt","Z","0000"],["HD8kEW7oNQGro55","Z","0000"],["HpGQN8jkhcmdnmb","Z","0000"],["JMDqgpP94QKoEeH","Z","0000"],["KKaRtSF9QNpKUYK","Z","0000"],["KvyFkQZuziYWCYa","Z","0000"],["L78TjCXg7Eyux8M","Z","0000"],["LTh7q5QEgK52Hca","Z","0000"],["LovCakMrYnZZ5cy","Z","0000"],["MJDM3mXskaPPt8C","Z","0000"],["MXSNHHUVQSmEJ5U","Z","0000"],["QKoBdYdBgxaAYMv","Z","0000"],["QSFeZgKDzziiWNX","Z","0000"],["Qa7gRNFEfmUPUSG","Z","0000"],["Qv6DrgfHWivob77","Z","0000"],["RKTaBLq5HuGWPNn","Z","0000"],["RjBi7c4Ff9rmPiC","Z","0000"],["SDbi3tB5aJyGqWJ","Z","0000"],["SS5REaCugG4PjyG","Z","0000"],["SVWsxdLxzpBNfeo","Z","0000"],["SZz3PcZJh5euBk2","Z","0000"],["UUJAfcAgUhYnYvu","Z","0000"],["UVsskeyw5jwLMNG","Z","0000"],["UWqz7Xwzqm7hSCA","Z","0000"],["V5KTFqy3QjqVeGD","Z","0000"],["VRj28PfE8bA7z9w","Z","0000"],["WcjrafLQA4ise3w","Z","0000"],["Wuhp9b9JK86mHbY","Z","0000"],["Xhqy7KyXmb2AC3r","Z","0000"],["YbRrCZauFDT7ekr","Z","0000"],["YdqvxxUuzkXgxPC","Z","0000"],["Yp6AvqHEEe4ihM5","Z","0000"],["ZQmAoLfDREctjR8","Z","0000"],["ZUG3xiwyXuG9EX6","Z","0000"],["ZjZWpcAuMqBu7sA","Z","0000"],["a63wdGbNERHMpa5","Z","0000"],["aCrEahwmLWnrEYk","Z","0000"],["b5RLrSWpuUA2xDJ","Z","0000"],["bbTqjAtUhBixvsA","Z","0000"],["bza5NNzwUcDGxjZ","Z","0000"],["cSuNdR3gM2yuhno","Z","0000"],["dvqrTPaYCbu9T83","Z","0000"],["eXpL2bTtqrJonfb","Z","0000"],["foYN97mrvgzxzfw","Z","0000"],["gW7ga3dwaYk4hfx","Z","0000"],["gqAaugd5Qxp49Qj","Z","0000"],["gtaNzg4gpSmknmC","Z","0000"],["hJBPtEuC5h7RUFp","Z","0000"],["hgxq4KDDQnLfDdt","Z","0000"],["hqfxkrJQWUySWrF","Z","0000"],["jjUX2TMExwDtacb","Z","0000"],["jvrcE3pVMgTWvsv","Z","0000"],["kGvs3kKPBRiy5gh","Z","0000"],["kJtmEhtJw2ejJEV","Z","0000"],["kmvqfevENfsFPAP","Z","0000"],["kqdqnxMFFJkyniW","Z","0000"],["kvz8FYgH7k4cKA3","Z","0000"],["mAMxZWF3MpVmGVW","Z","0000"],["mgnZKBCHCRr6J3U","Z","0000"],["mq8E4JwZjsC3EgA","Z","0000"],["muyQwyGhLXBcygT","Z","0000"],["nBUHKgNiTxgKfQT","Z","0000"],["nUKGRNBDCgZKjsc","Z","0000"],["nyQrM9tnSnKQnJR","Z","0000"],["ohhExfYetv3eYBU","Z","0000"],["ootDX8x8SGJxMUR","Z","0000"],["pRdJeoNkkQe543y","Z","0000"],["pRrZmbZjLbVZVWV","Z","0000"],["pbqjhNuNtAT77xF","Z","0000"],["pzrUd7ThTqF5rKD","Z","0000"],["q82SRp3qXgffQtG","Z","0000"],["r99FJzPh8u9bUy8","Z","0000"],["riwVLxaVz77qQTZ","Z","0000"],["ruHR4xBaQbnmchD","Z","0000"],["sXi35xooa3ZiT4A","Z","0000"],["sdawYAQWMEfjgJs","Z","0000"],["swjPPH8TzLQEaZd","Z","0000"],["tgziBNhoy6w5vHK","Z","0000"],["uVoyYaqET9ao8Zt","Z","0000"],["uokJh8abQzADFmR","Z","0000"],["v2YB7uY3bwvonCS","Z","0000"],["ww3JhcTYGatBoxb","Z","0000"],["x5mtu2ABVjfkjXn","Z","0000"],["x9CLJZ7HBDucjyS","Z","0000"],["xSWQPuWRYdon4w8","Z","0000"],["xXuTdzPfU8ksiy3","Z","0000"],["xqFuHJkzMDUQxMm","Z","0000"],["xtMkWjtq8RksQnS","Z","0000"],["y96xnv9gwjGbMqS","Z","0000"],["yBhdDyzyXYuyRty","Z","0000"],["yEqkFByQAFoSczB","Z","0000"],["ynXouk6pswt77fL","Z","0000"],["z3qdkJUoFEFaRqH","Z","0000"],["znTx6Mrwshfm5mp","Z","0000"],["zrTH9MYN5YgmPDL","Z","0000"]]
    }

    componentDidMount(){
        //Initializing a pointable object by fetching Credentials Array
        axios.get(this.props.baseUrl.dynamicBase3 + 'credentials.json')
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
                axios.put(this.props.baseUrl.dynamicBase3 + 'points.json',pointTableObj)
                     .catch(err=>{
                        console.log(err);
                        alert('There is another Network Error you Moronic Developer')
                     })

                axios.put(this.props.baseUrl.dynamicBase1 + 'artifacts/boats.json',this.state.artifactsCode)
                     .catch(err=>{
                        alert('Network Error');
                        console.log(err);
                     })
                
                axios.put(this.props.baseUrl.dynamicBase4 + 'backUpTrCoins.json',pointTableObj)
                     .catch(err=>{
                        console.log(err);
                        alert('There is another Network Error you Moronic Developer')
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


