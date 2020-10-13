package company.newlife.service.impl;

import company.newlife.dao.MessageDAO;
import company.newlife.entity.MessageEntity;
import company.newlife.model.Message;
import company.newlife.service.MessageService;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageDAO messageDAO;

    @Override
    public void create(Message message) {
        MessageEntity messageEntity = new MessageEntity();
        messageEntity.setName(message.getName());
        messageEntity.setEmail(message.getEmail());
        messageEntity.setPhoneNumber(message.getPhoneNumber());
        messageEntity.setContent(message.getContent());
        messageEntity.setCreatedDate(message.getCreatedDate());
        messageEntity.setConfirmedDate(message.getConfirmedDate());
        messageEntity.setStatus(message.getStatus());
        messageDAO.create(messageEntity);
    }

    @Override
    public Message get(Integer id) {
        MessageEntity messageEntity = messageDAO.get(id);
        Message message = new Message();
        message.setId(messageEntity.getId());
        message.setName(messageEntity.getName());
        message.setEmail(messageEntity.getEmail());
        message.setPhoneNumber(messageEntity.getPhoneNumber());
        message.setContent(messageEntity.getContent());
        message.setCreatedDate(messageEntity.getCreatedDate());
        message.setConfirmedDate(messageEntity.getConfirmedDate());
        message.setStatus(messageEntity.getStatus());
        return message;
    }

    @Override
    public List<Message> getAll() {
        List<MessageEntity> messageEntities = messageDAO.getAll();
        if (messageEntities == null) {
            return null;
        }
        return messageEntities.stream().map(element -> {
            Message message = new Message();
            message.setId(element.getId());
            message.setName(element.getName());
            message.setEmail(element.getEmail());
            message.setPhoneNumber(element.getPhoneNumber());
            message.setContent(element.getContent());
            message.setCreatedDate(element.getCreatedDate());
            message.setConfirmedDate(element.getConfirmedDate());
            message.setStatus(element.getStatus());
            return message;
        }).collect(Collectors.toList());
    }

    @Override
    public PagingResponse<Message> fetch(PagingRequest request) {
        List<MessageEntity> messageEntities = messageDAO.fetch(request);
        PagingResponse<Message> response = new PagingResponse<>();
        if (messageEntities == null) {
            return null;
        }
        response.setData(messageEntities.stream().map(element -> {
            Message message = new Message();
            message.setId(element.getId());
            message.setName(element.getName());
            message.setEmail(element.getEmail());
            message.setPhoneNumber(element.getPhoneNumber());
            message.setContent(element.getContent());
            message.setCreatedDate(element.getCreatedDate());
            message.setConfirmedDate(element.getConfirmedDate());
            message.setStatus(element.getStatus());
            return message;
        }).collect(Collectors.toList()));
        response.setDraw(request.getDraw());
        response.setRecordsFiltered(messageEntities.size());
        response.setRecordsTotal((int) messageDAO.count());
        response.setTotalDraw(response.getRecordsFiltered() / request.getLength());
        return response;
    }

    @Override
    public void update(Message message) {
        MessageEntity messageEntity = new MessageEntity();
        messageEntity.setId(message.getId());
        messageEntity.setConfirmedDate(message.getConfirmedDate());
        messageEntity.setStatus(message.getStatus());
        messageDAO.create(messageEntity);
    }

    @Override
    public void delete(Integer id) {
        MessageEntity messageEntity = messageDAO.get(id);
        messageDAO.delete(messageEntity);
    }
}
