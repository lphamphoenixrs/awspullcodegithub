/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import SiteJsx from './Site.jsx';
import AdminBaseComponent from '../../../AdminBaseComponent';
import SiteService from '../../../../services/SiteService';
import './Site.scss';

export default class Site extends AdminBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.jsxTemplate = SiteJsx;
    this.state = {
      curItem: {},
      dataList: [],
      formSearch: false,
      searchParam: {
        limit: Constants.COMMON.LIMIT,
        offset: 0,
        index: 1,
      },
      paging: {
        total: 0,
        current: 1
      },
      total_row: 0,
      showAddSitePopup: false,
      showDeleteSitePopup : false,
      showAddManageSitePopup: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.getList();
  }

  handleInputChange(event) {
    let self = this;
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name) {
        let params = self.state.searchParam;
        params[name] = (event.target.validity.valid) ? value : params[name];
        self.setState({
            searchParam: params
        });
    }
}

  /**
    * @description Status change event
    * @author long.pham 2021-01-06
    */
  onStatusChange = (index) => {
    if (!Libs.isArrayData(this.state.dataList)) return;
    var self = this;
    var item = this.state.dataList[index];
    var isActiveUpdate = item.status;
    if (isActiveUpdate * 1 == 1) {
        isActiveUpdate = 0;
    }
    else {
        isActiveUpdate = 1;
    }
    var param = {
        id: item.id,
        status: isActiveUpdate
    };
    SiteService.instance.updateStatus(param, function (status, msg) {
        if (status) {
            item.status = isActiveUpdate;
            self.setState({
                dataList: self.state.dataList
            });
        }
    });
  }

  /**
   * get Site list
   * @author Long.Pham 2021-01-06
   */
  getList() {
    let self = this;
    SiteService.instance.getList(self.state.searchParam, (data, total_row) => {
      if (Libs.isArrayData(data)) {
        self.state.dataList = data;
        var total = parseInt(total_row / self.state.searchParam.limit);
        if (total_row % self.state.searchParam.limit > 0) {
          total = total + 1;
        }
        self.state.paging.total = total;
        self.state.paging.current = self.state.searchParam.index;
        self.state.total_row = total_row;
        
      } else {
        self.setState({
          dataList: [],
          total_row: 0,
          paging: {
            total: 0,
            current: 1
          }
        });
      }
      self.forceUpdate()
    })
  }

  /**
   * Select page in pagging
   * @author Long.Pham 2021-01-06
   * @param {int} index
   */
  onSelectPage(index) {
    let self = this;
    self.state.searchParam.index = index;
    if (index > 0) {
      self.state.searchParam.offset = (index - 1) * self.state.searchParam.limit
    } else {
      self.state.searchParam.offset = 0
    }
    self.getList()
  }


  /**
   * @description Show Site popup
   * @author Long.Pham 2021-01-06
  */
  onAddSitePopup() {
    this.setState({
      curItem: { screen_mode: Constants.SCREEN_MODE.ADD },
      showAddSitePopup: true
    });
  }

  /**
   * @description Close popup add site
   * @author Long.Pham 2021-01-06
   */
  onCloseAddSitePopup = (status, item) => {
    let self = this;
    if(status && item)
    {
      var {searchParam, paging} = self.state;
      searchParam.limit = Constants.COMMON.LIMIT;
      searchParam.offset = 0;
      searchParam.index = 1;

      paging.total = 0;
      paging.current = 1;

      self.setState({
        searchParam: searchParam,
        paging: paging
      }, () => {
        self.getList();
      })
      
    }
    this.setState({
      showAddSitePopup: false
    });
  }

  /**
   * @description Close manage site popup
   * @author Long.Pham 2021-01-06
   */
  onCloseAddManageSitePopup = () => {
    this.setState({
      showAddManageSitePopup: false
    });
  }

  onCloseDeleteSitePopup = (status, item) => {
    let self = this;
    if(status && item){
      self.getList();
    }
    
    this.setState({
      showDeleteSitePopup: false
    });
  }
  /**
     * @description Item click event
     * @author Long.Pham 2021-01-06
     * @param index element in the list
     */
    onItemClick = (index) => {
      if (!Libs.isArrayData(this.state.dataList)) return;
      var item = this.state.dataList[index];
      item.screen_mode = Constants.SCREEN_MODE.EDIT;
      var roles = [];
      if(!Libs.isBlank(item.role_ids)){
          var arrRoles = item.role_ids.split(',');
          arrRoles.map((k, v) => {
              var itemRole = {
                  id_Site: parseInt(item.id),
                  id_role: parseInt(k),
                  is_checked: 1
              }
              roles.push(itemRole);
          });
      }

      item.roles = roles;

      this.setState({
          curItem: item,
          showAddSitePopup: true
      });
  }

  /**
     * @description Item click event
     * @author Long.Pham 2021-01-06
     * @param index element in the list
     */
    onItemClickManageSite = (index) => {
      if (!Libs.isArrayData(this.state.dataList)) return;
      var item = this.state.dataList[index];
      item.screen_mode = Constants.SCREEN_MODE.VIEW;
      this.setState({
          curItem: item,
          showAddManageSitePopup: true
      });
  }


  /**
   * @description Item click event delete
   * @author Long.Pham 2021-01-06
   * @param index Order element in the list
   */
  onItemClickDelete = (index) => {
      if (!Libs.isArrayData(this.state.dataList)) return;
      var item = this.state.dataList[index];
      this.setState({
          curItem: item,
          showDeleteSitePopup: true
      });
  }

  /**
    * Func filter table
    * @author long.pham 2021-01-06
    * @param  {Object} e
    */

  onSort(event, sortKey) {
    this.state.searchParam.sort_column = sortKey;
    this.state.searchParam.order_by = (this.state.searchParam.order_by == '' || this.state.searchParam.order_by == 'asc') ? 'desc' : 'asc';
    this.forceUpdate();
    this.getList();
  }

  onSearch() {
    let self = this;
    let formSearch = (this.state.formSearch == false) ? true : false;
    if (this.state.formSearch == true) {
        let searchParam = this.state.searchParam;
        searchParam.keyword = '';
        searchParam.index = 1;
        searchParam.offset = 0;
        self.pagging.current = 1;
        self.pagging.total = 1;
        self.setState({
          searchParam: searchParam
        }, () => {
            self.getList();
        });
    }
    this.setState({
        formSearch: formSearch
    });
  }

  closeFormSearch(){
    this.setState({
      formSearch: false
    })
  }

  /**
   * Func search
   * @author long.pham 2021-01-06
   * @param  {Object}
   */

  handleSearch() {
    this.getList();
  }

  render() {
    return this.jsxTemplate.call(this);
  }
}

