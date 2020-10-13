package company.newlife.controller.api;

import company.newlife.entity.MessageEntity;
import company.newlife.model.Message;
import company.newlife.service.MessageService;
import company.newlife.util.ApiResponse;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MessageRestController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/public/message/getAll")
    public ApiResponse<List<Message>> getAll() {
        return new ApiResponse<>(true, messageService.getAll());
    }

    @PostMapping(value = "/public/message/create")
    public ApiResponse<String> create(@RequestParam String name, @RequestParam String email,
                                      @RequestParam String phoneNumber, @RequestParam String message) {
//        messageService.create(message);
        System.out.println(name + " " + email + " " + phoneNumber + " " + message);
        return new ApiResponse<>(true, "Tin nhắn được gửi đi, chúng tôi sẽ liện hệ với bạn sớm nhất.");
    }

    @PutMapping(value = "/admin/message/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> update(@RequestBody Message message) {
        messageService.update(message);
        return new ApiResponse<>(true, "");
    }

    @DeleteMapping("/admin/message/delete/{id}")
    public ApiResponse<String> delete(@PathVariable("id") Integer id) {
        messageService.delete(id);
        return new ApiResponse<>(true, "");
    }

    @PostMapping("/public/message/fetch")
    public ApiResponse<PagingResponse<Message>> fetch(@RequestBody PagingRequest request) {
        return new ApiResponse<>(true, messageService.fetch(request));
    }

    @GetMapping("/public/message/getById/{id}")
    public ApiResponse<Message> getById(@PathVariable("id") Integer id) {
        return new ApiResponse<>(true, messageService.get(id));
    }

}
