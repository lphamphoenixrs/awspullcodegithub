/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
package com.phoenixrs.api.controllers;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.phoenixrs.api.utils.Constants;
import com.phoenixrs.api.entities.DeviceGroupEntity;
import com.phoenixrs.api.services.DeviceGroupService;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/device-group")
public class DeviceGroupController extends BaseController {

	/**
	 * @description Get list group device
	 * @author long.pham
	 * @since 2021-01-11
	 * @return data (status, message, array, total_row
	 */
	@PostMapping("/list-dropdown")
	public Object getList(@RequestBody DeviceGroupEntity obj) {
		try {
			DeviceGroupService service = new DeviceGroupService();
			List data = service.getList(obj);
			return this.jsonResult(true, Constants.GET_SUCCESS_MSG, data, data.size());
		} catch (Exception e) {
			log.error(e);
			return this.jsonResult(false, Constants.GET_ERROR_MSG, e, 0);
		}
	}
}
