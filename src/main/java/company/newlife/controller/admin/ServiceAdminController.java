package company.newlife.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ServiceAdminController {

    @GetMapping("/manage/service")
    public String goToDashboard() {
        return "admin/service";
    }
}
