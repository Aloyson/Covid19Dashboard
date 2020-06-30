const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
     rules: [
  	{
	   test: /\.(js|jsx)$/,
	   exclude: /node_modules/,
	   use: {
 	     loader: "babel-loader"
	   }
	  },
	  {
		test: /\.html$/,
		use: [
		 {
		  loader: "html-loader"
		 }
		]
	  },
	  {
		test: /\.css$/,
		use: [
		 
		  "style-loader",
		  "css-loader"
		 
		]
	  },
	  {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
	]
   },
   devServer:{
	   inline:true,
	   contentBase:'./dist',
	   port:9870
   },
   plugins: [
     new HtmlWebPackPlugin({
		 template: "./src/index.html",
	     filename: "./index.html"
	  })
	 ]
};
