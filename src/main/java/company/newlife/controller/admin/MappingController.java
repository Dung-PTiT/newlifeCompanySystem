package company.newlife.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class MappingController {

    @GetMapping("/manage/dashboard")
    public String goToDashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/manage/service")
    public String goToService() {
        return "admin/service";
    }

    @GetMapping("/manage/message")
    public String goToMessage() {
        return "admin/message";
    }

}
