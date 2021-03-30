class Setting{
  constructor(
		data
  ){
		this._init(data);
  }

	_init(data){
		this._styleType = data['styleType']; 		// 主题风格
		this._styleColor = data['styleColor']; 	// 主题颜色
	}

	get styleType() {
		return this._styleType;
	}

	set styleType(value) {
		this._styleType = value;
	}

	get styleColor() {
		return this._styleColor;
	}

	set styleColor(value) {
		this._styleColor = value;
	}
}

export default new Setting({
	styleType: 'FLAT',                    		// 主题风格
	styleColor: 'default',                    // 主题颜色
})